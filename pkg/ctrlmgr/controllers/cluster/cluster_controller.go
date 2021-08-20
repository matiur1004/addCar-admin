/*
Copyright 2021 KubeCube Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package controllers

import (
	"context"
	"fmt"
	"time"

	"github.com/kubecube-io/kubecube/pkg/utils/kubeconfig"

	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/source"

	clusterv1 "github.com/kubecube-io/kubecube/pkg/apis/cluster/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/event"
	"sigs.k8s.io/controller-runtime/pkg/manager"
	"sigs.k8s.io/controller-runtime/pkg/predicate"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"

	"github.com/kubecube-io/kubecube/pkg/clients"
	"github.com/kubecube-io/kubecube/pkg/clog"
	"github.com/kubecube-io/kubecube/pkg/multicluster"
	multiclustermgr "github.com/kubecube-io/kubecube/pkg/multicluster/manager"
	"github.com/kubecube-io/kubecube/pkg/utils"
	"github.com/kubecube-io/kubecube/pkg/utils/constants"
)

var (
	log clog.CubeLogger

	_ reconcile.Reconciler = &ClusterReconciler{}
)

const clusterFinalizer = "cluster.finalizers.kubecube.io"

// ClusterReconciler deploy warden to member cluster
// when create event trigger
type ClusterReconciler struct {
	client.Client
	Scheme       *runtime.Scheme
	pivotCluster clusterv1.Cluster

	// Affected is a channel of event.GenericEvent (see "Watching Channels" in
	// https://book-v1.book.kubebuilder.io/beyond_basics/controller_watches.html) that is used to
	// enqueue additional objects that need updating.
	Affected chan event.GenericEvent
}

func newReconciler(mgr manager.Manager) (*ClusterReconciler, error) {
	log = clog.WithName("cluster")

	pivotCluster := clusterv1.Cluster{}
	err := clients.Interface().Kubernetes(constants.PivotCluster).Direct().Get(context.Background(), types.NamespacedName{Name: constants.PivotCluster}, &pivotCluster)
	if err != nil {
		return nil, err
	}

	r := &ClusterReconciler{
		Client:       mgr.GetClient(),
		Scheme:       mgr.GetScheme(),
		Affected:     make(chan event.GenericEvent),
		pivotCluster: pivotCluster,
	}
	return r, nil
}

//+kubebuilder:rbac:groups=cluster.kubecube.io,resources=clusters,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=cluster.kubecube.io,resources=clusters/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=cluster.kubecube.io,resources=clusters/finalizers,verbs=update

func (r *ClusterReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	clog.Info("Reconcile cluster %v", req.Name)

	isMemberCluster := !(req.Name == constants.PivotCluster)
	currentCluster := r.pivotCluster

	if isMemberCluster {
		// get cr ensure memberCluster cr exist
		if err := r.Get(ctx, req.NamespacedName, &currentCluster); err != nil {
			if errors.IsNotFound(err) {
				log.Debug("memberCluster %v has deleted, skip", currentCluster.Name)
				return ctrl.Result{}, nil
			}
			log.Error("get memberCluster %v cr failed: %v", currentCluster.Name, err)
			return ctrl.Result{}, err
		}

		// examine DeletionTimestamp to determine if object is under deletion
		if currentCluster.ObjectMeta.DeletionTimestamp.IsZero() {
			// ensure finalizer
			if err := r.ensureFinalizer(ctx, &currentCluster); err != nil {
				return ctrl.Result{Requeue: true}, err
			}
		} else {
			// relation remove
			if err := r.removeFinalizer(ctx, &currentCluster); err != nil {
				return ctrl.Result{}, err
			}
			// Stop reconciliation as the item is being deleted
			return ctrl.Result{}, nil
		}

		// generate internal cluster for current cluster and add
		// it to the cache of multi cluster manager
		skip, err := multiclustermgr.AddInternalCluster(currentCluster)
		switch {
		case err != nil && skip:
			clog.Error(err.Error())
			return ctrl.Result{}, err
		case *currentCluster.Status.State == clusterv1.ClusterInitFailed:
			r.enqueue(currentCluster)
		}

		clog.Info("add cluster %v to internal clusters success", currentCluster.Name)
	}

	return r.syncCluster(ctx, currentCluster)
}

func (r *ClusterReconciler) syncCluster(ctx context.Context, currentCluster clusterv1.Cluster) (ctrl.Result, error) {
	if *currentCluster.Status.State == clusterv1.ClusterInitFailed {
		err := multicluster.Interface().ScoutFor(context.Background(), currentCluster.Name)
		if err != nil {
			log.Error("start scout for memberCluster %v failed", currentCluster.Name)
			return ctrl.Result{}, err
		}

		updateFn := func(cluster *clusterv1.Cluster) {
			state := clusterv1.ClusterInitFailed
			reason := fmt.Sprintf("cluster %s init failed", cluster.Name)
			cluster.Status.State = &state
			cluster.Status.Reason = reason
		}

		err = utils.UpdateStatus(ctx, r.Client, &currentCluster, updateFn)
		if err != nil {
			log.Error("update cluster %v status failed", currentCluster.Name)
			return ctrl.Result{}, err
		}
		return ctrl.Result{}, nil
	}

	// deploy resources to cluster
	err := deployResources(ctx, currentCluster, r.pivotCluster)
	if err != nil {
		log.Error("deploy resource failed: %v", err)
	}

	// start to scout loop for memberCluster warden, non-block
	err = multicluster.Interface().ScoutFor(context.Background(), currentCluster.Name)
	if err != nil {
		log.Error("start scout for memberCluster %v failed", currentCluster.Name)
		return ctrl.Result{}, err
	}

	// update cluster status to processing
	updateFn := func(cluster *clusterv1.Cluster) {
		state := clusterv1.ClusterProcessing
		reason := fmt.Sprintf("cluster %s initializing", cluster.Name)
		cluster.Status.State = &state
		cluster.Status.Reason = reason
	}

	err = utils.UpdateStatus(ctx, r.Client, &currentCluster, updateFn)
	if err != nil {
		log.Error("update cluster %v status failed", currentCluster.Name)
	}

	return ctrl.Result{}, nil
}

// It enqueues a cluster for later reconciliation. This occurs in a goroutine
// so the caller doesn't block; since the reconciler is never garbage-collected, this is safe.
func (r *ClusterReconciler) enqueue(cluster clusterv1.Cluster) {
	const retrySeconds = 5

	config, _ := kubeconfig.LoadKubeConfigFromBytes(cluster.Spec.KubeConfig)

	// try to reconnect with cluster api server, requeue if every is ok
	go func() {
		for {
			select {
			case <-time.Tick(retrySeconds * time.Second):
				_, err := client.New(config, client.Options{Scheme: r.Scheme})
				if err == nil {
					log.Info("Enqueuing cluster %v for reconciliation", cluster.Name)
					r.Affected <- event.GenericEvent{Object: &cluster}
					return
				}
			}
		}
	}()
}

// SetupWithManager sets up the controller with the Manager.
func SetupWithManager(mgr ctrl.Manager) error {
	r, err := newReconciler(mgr)
	if err != nil {
		return err
	}

	// filter update event
	predicateFunc := predicate.Funcs{
		CreateFunc: func(event event.CreateEvent) bool {
			return true
		},
		UpdateFunc: func(updateEvent event.UpdateEvent) bool {
			if !updateEvent.ObjectNew.GetDeletionTimestamp().IsZero() {
				return true
			}
			return false
		},
		DeleteFunc: func(deleteEvent event.DeleteEvent) bool {
			return false
		},
		GenericFunc: func(genericEvent event.GenericEvent) bool {
			// we use generic event to process init failed cluster
			return true
		},
	}

	return ctrl.NewControllerManagedBy(mgr).
		For(&clusterv1.Cluster{}).
		Watches(&source.Channel{Source: r.Affected}, &handler.EnqueueRequestForObject{}).
		WithEventFilter(predicateFunc).
		Complete(r)
}
