// Code behind logic for list of PostListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { OnInit, Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

import { PagerService } from "@app-shared/common/pager.service";
import { ListPageWrapper } from "@app-shared/common/list-page-wrapper.model";
import { NotificationService } from "@app-shared/services/notification.service";
import { SpinnerOverlayService } from "@app-shared/services/spinner-overlay.service";
import { PostListItem } from "../../../shared/models/blog/post-list-item.model";
import { PostService } from "../../../shared/services/blog/post.service";
import { NavigationService } from "../../../shared/services/navigation/navigation.service";


@Component({
  styleUrls: ['./post-list.component.css'],
  templateUrl: './post-list.component.html'
})

export class PostListComponent implements OnInit, OnDestroy {
  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver

  pageWrapper: ListPageWrapper<PostListItem>;
  posts: Array<PostListItem>;
  pager: any = {};

  constructor(private defaultService: PostService, private pagerService: PagerService, private spinnerService: SpinnerOverlayService,
    private route: ActivatedRoute, private router: Router,
    private navigationService: NavigationService,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.navigationService.setContextVariable("entityName", "Post");
    this.navigationService.setContextVariable("entityLink", "posts");
    this.routeDataSubscription = this.route.data.subscribe((data: { posts: ListPageWrapper<PostListItem> }) => {
      this.pageWrapper = data.posts;
      this.posts = data.posts.items;
      this.pager = this.pagerService.getPager(data.posts.totalCount, data.posts.currentPage, data.posts.pageSize);
    });
  }

  deletePost(uid: string) {
    this.defaultService.deletePost(uid).subscribe((res) => {
      this.notificationService.showSuccess("The post was deleted successfully");
      this.reloadList();
    });
  }

  clonePost(uid: string) {
    this.defaultService.clonePost(uid).subscribe((res) => {
      this.notificationService.showSuccess("The post was cloned successfully");
      this.reloadList();
    });
  }

  private reloadList() {
    this.spinnerService.show();
    this.defaultService.getPosts(this.pager.currentPage).subscribe((post: ListPageWrapper<PostListItem>) => {
      this.pageWrapper = post;
      this.posts = post.items;
      this.pager = this.pagerService.getPager(post.totalCount, post.currentPage, post.pageSize);
      this.spinnerService.hide();
    }, (err) => {
      this.spinnerService.hide();
      throw err;
    });
  }

  //Unsubscribe from subscriptions here
  ngOnDestroy() {
    if (this.routeDataSubscription)
      this.routeDataSubscription.unsubscribe();
  }
}
