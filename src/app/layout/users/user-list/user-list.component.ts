// Code behind logic for list of UserProfileListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ListPageWrapper } from "@app-shared/common/list-page-wrapper.model";
import { PagerService } from "@app-shared/common/pager.service";
import { UserProfileListItem } from '@app-shared/models/user-profile-list-item.model';
import { NotificationService } from "@app-shared/services/notification.service";
import { SpinnerOverlayService } from "@app-shared/services/spinner-overlay.service";
import { UserProfileService } from '@app-shared/services/user/user-profile.service';
import { MessageCodes } from '@app-shared/models/system/message-codes';
import { UserDeleteDialogComponent } from "../user-delete-dialog/user-delete-dialog.component";
import { UserDeactivateDialogComponent } from "../user-deactivate-dialog/user-deactivate-dialog.component";
import { UserActivateDialogComponent } from "../user-activate-dialog/user-activate-dialog.component";


@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit, OnDestroy {
  private routeDataSubscription: Subscription; // Used for the current model retrieval from the resolver

  public pageWrapper: ListPageWrapper<UserProfileListItem>;
  public users: Array<UserProfileListItem>;
  public pager: any = {};
  public queryParams: string;

  constructor(
    private readonly dialog: MatDialog,
    private readonly defaultService: UserProfileService,
    private readonly pagerService: PagerService,
    private readonly spinnerService: SpinnerOverlayService,
    private readonly route: ActivatedRoute,
    private readonly notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe((data: { userProfiles: ListPageWrapper<UserProfileListItem> }) => {
      this.pageWrapper = data.userProfiles;
      this.users = data.userProfiles.items;
      this.pager = this.pagerService.getPager(data.userProfiles.totalCount, data.userProfiles.currentPage, data.userProfiles.pageSize);
    });
    this.getQueryParams();
  }

  deactivateUser(user: any): void {
    const dialogRef = this.dialog.open(UserDeactivateDialogComponent, {
      data: { user: user } });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result){
          this.defaultService.deactivateUser(user.uid).subscribe({
            next: () => {
              this.notificationService.showSuccessMessage(MessageCodes.UserProfileDeactivationSuccess);
              this.reloadList();
            },
            error: (error) => {
              if (error.status === 409) {
                this.notificationService.showWarningMessage(MessageCodes.UserProfileDeactivationOwnAccountError);
              }
              else {
                this.notificationService.showErrorMessage(MessageCodes.UserProfileDeactivationError);
              }
            }
          });
        }
      }
    })
  }

  activateUser(user: any) {
    const dialogRef = this.dialog.open(UserActivateDialogComponent, {
      data: {user: user}
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.defaultService.activateUser(user.uid).subscribe({
            next: () => {
              this.notificationService.showSuccess("The user was activated successfully");
              this.reloadList();
            },
            error: (error) => {
              if (error.status === 409) {
                this.notificationService.showWarning("You cannot activate your own account");
              } else {
                this.notificationService.showError("Error during the activation");
              }
            }
          });
        }
      }
    });
  }

  public deleteUserProfile(user: UserProfileListItem) {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent, { data: { user: user } });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.defaultService.deleteUserProfile(user.uid).subscribe({
            next: () => {
              this.notificationService.showSuccessMessage(MessageCodes.UserProfileRemovalSuccess);
              this.reloadList();
            },
            error: (error) => {
              if (error.status === 409) {
                this.notificationService.showWarningMessage(MessageCodes.UserProfileRemovalOwnAccountError);
              }
            },
          });
        }
      },
    });
  }

  public resendInvitation(uid: string) {
    this.defaultService.resendInvitation(uid).subscribe((res) => {
      this.notificationService.showSuccessMessage(MessageCodes.UserProfileResendInvitationSuccess);
      this.reloadList();
    });
  }

  public editUser(uid: string) {}
  private reloadList() {
    this.spinnerService.show();
    this.defaultService.getUserProfiles(this.pager.currentPage).subscribe(
      (userProfiles: ListPageWrapper<UserProfileListItem>) => {
        this.pageWrapper = userProfiles;
        this.users = userProfiles.items;
        this.pager = this.pagerService.getPager(
          userProfiles.totalCount,
          userProfiles.currentPage,
          userProfiles.pageSize,
        );
        this.spinnerService.hide();
      },
      (err) => {
        this.spinnerService.hide();
        throw err;
      },
    );
  }

  public getQueryParams(): string{
    this.route.queryParams.subscribe(params => {
      this.queryParams = params.searchText;
    });
    return this.queryParams;
  };

  //Unsubscribe from subscriptions here
  public ngOnDestroy() {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
  }
}
