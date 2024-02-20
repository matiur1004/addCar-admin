// Code behind logic for UserDetailsComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserProfileViewModel} from '@app-shared/models/user-profile-view-model.model';
import {NotificationService} from '@app-shared/services/notification.service';
import {UserProfileService} from '@app-shared/services/user/user-profile.service';
import {UserProfileEditComponent} from '../user-profile-edit/user-profile-edit.component';
import {MessageCodes} from '@app-shared/models/system/message-codes';
import {MatDialog} from "@angular/material/dialog";
import {UserChangePasswordComponent} from "../user-change-password/user-change-password.component";

@Component({
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver
  currentModel: UserProfileViewModel;
  isSubmitting = false;

  get isCurrentProfile() { return this.route.snapshot.params['uid'] === 'profile'; }

  @ViewChild("profEditComponent")
  profEditComponent: UserProfileEditComponent;

  constructor(
    private defaultService: UserProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    ) {}

  ngOnInit() {
    this.routeDataSubscription = this.route.data.subscribe((data: { userProfile: UserProfileViewModel }) => {
      this.currentModel = data.userProfile;
    });
  }

  //Save the model and update it from the service
  save() {
    const isSaved = this.profEditComponent.save();
    if (isSaved) {
      this.isSubmitting = true;
      this.profEditComponent.disable();
      this.defaultService.saveUserProfile(this.currentModel).subscribe(res => {
        this.isSubmitting = false;
        this.profEditComponent.enable();
        this.notificationService.showSuccessMessage(MessageCodes.UserProfileSaveSuccess);
        this.router.navigateByUrl(this.isCurrentProfile ? `/users/profile` : `/users/${res.uid}`);
      },
      (err) => {
        if (err.status === 401) {
            this.notificationService.showErrorMessage(MessageCodes.NotAuthorizedError);
            this.router.navigateByUrl("/");
          }
          this.isSubmitting = false;
          this.profEditComponent.enable();
          throw err;
        }
      );
    }
  }

  openChangePasswordModal(){
    const dialogRef = this.dialog.open(UserChangePasswordComponent);
  }


  //Unsubscribe from subscriptions here
  public ngOnDestroy() {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
  }
}
