// Code behind logic for FranchiseeDetailsComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FranchiseeViewModel } from '@app-shared/models/franchisee-view-model.model';
import { FranchiseeService } from '@app-shared/services/franchisee/franchisee.service';
import { GlobalService } from '@app-shared/services/global.service';
import { NotificationService } from '@app-shared/services/notification.service';
import { MessageCodes } from '@app-shared/models/system/message-codes';
import { AuthService } from '../../../shared/services/auth.new.service';
import { UserRoles } from '../../../shared/models/enums';

@Component({
  templateUrl: './franchisee-details.component.html',
  styleUrls: ['./franchisee-details.component.less'],
})
export class FranchiseeDetailsComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;

  private routeDataSubscription: Subscription; //Used for the current model retrieval from the resolver
  public currentModel: FranchiseeViewModel;
  public submitted = false;
  public isSubmitting = false;
  public uid: string;
  disabledoption = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly defaultService: FranchiseeService,
    private readonly globalService: GlobalService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService
  ) { }

  get formReadOnly() {
    return this.authService.isUserInRole(UserRoles.FranchiseeAdmin) || this.authService.isUserInRole(UserRoles.FranchiseeUser);
  }

  ngOnInit() {
    this.routeDataSubscription = this.route.data.subscribe(
      (data: { franchisee: FranchiseeViewModel }) => {
        this.currentModel = data.franchisee;

        // emit to sidebar component that current menu has no subfranchisee menu on create
        this.route.params.subscribe((x) => {
          if (x.uid === 'new') {
            this.globalService.emitFranchiseeDetail(null);
          } else {
            this.globalService.emitFranchiseeDetail(this.currentModel);
          }
        });

        if (this.currentModel) this.createForm();
      },
    );
  }

  // convenience getter for easy access to form fields
  public get fields() {
    return this.formGroup.controls;
  }
  //Applied to a new form
  //Requires unsubscribe
  public createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      websiteName: [this.currentModel.websiteName, Validators.required],
      websiteDomain: [this.currentModel.websiteDomain, Validators.required],
      email: [this.currentModel.email, [Validators.required, Validators.email]],
    });
    this.disabledoption = !this.currentModel.isPublicSiteManagementEnabled;
    if (this.disabledoption == true) {
      this.fields['websiteName'].disable();
      this.fields['websiteDomain'].disable();
    }
    if (this.formReadOnly) {
      this.formGroup.disable()
    }
  }

  //Applied after the model saved
  public updateForm() {
    const model = this.currentModel;
    this.formGroup.patchValue({
      websiteName: model.websiteName,
      email: model.email,
      websiteDomain: model.websiteDomain,
    });
  }

  //Update the model with the form values
  private applyForm() {
    const formValue = this.formGroup.value;
    this.currentModel.websiteName = formValue.websiteName;
    this.currentModel.websiteDomain = formValue.websiteDomain;
    this.currentModel.email = formValue.email;
    this.currentModel.isPublicSiteManagementEnabled = !this.disabledoption;
  }

  //Save the model and update it from the service
  public save() {
    this.submitted = true;
    if (!this.isValid || this.formReadOnly) {
      return;
    }
    this.applyForm();
    this.isSubmitting = true;
    this.formGroup.disable();
    this.defaultService.saveFranchisee(this.currentModel).subscribe(
      (res) => {
        this.isSubmitting = false;
        this.formGroup.enable();
        this.notificationService.showSuccessMessage(MessageCodes.FranchiseeSaveSuccess);


        void this.router.navigateByUrl(`/franchisees/${res.uid}`);
      },
      (err) => {
        if (err.status === 401) {
          this.notificationService.showErrorMessage(MessageCodes.NotAuthorizedError);
          void this.router.navigateByUrl('/');
        }
        this.isSubmitting = false;
        this.formGroup.enable();
        throw err;
      },
    );
  }

  //Validate the control
  private get isValid(): boolean {
    return this.formGroup.valid;
  }

  //toggle the disable and enable fields

  toggleDisable() {
    this.disabledoption = !this.disabledoption;

    if (this.disabledoption == false) {
      this.fields['websiteName'].enable();
      
      this.fields['websiteDomain'].enable();


    }
    else if (this.disabledoption == true)
    {
      this.fields['websiteName'].disable();
      this.fields['websiteDomain'].disable();

    }

  }



  //Unsubscribe from subscriptions here
  public ngOnDestroy() {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
  }
}
