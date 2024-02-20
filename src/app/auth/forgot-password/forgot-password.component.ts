// Code behind logic for UserForgotPasswordComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestPasswordRecoveryViewModel } from '@app-shared/models/request-password-recovery-view-model.model';
import { UserProfileService } from '@app-shared/services/user/user-profile.service';
import { Subscription } from 'rxjs';

@Component({
  providers: [UserProfileService],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;

  @ViewChild('submit') submit;

  private routeDataSubscription: Subscription; //Used for the current model retrieval from the resolver
  public currentModel: RequestPasswordRecoveryViewModel;
  public submitted = false;
  public isSubmitting = false;
  public isEmailSent = false;

  // convenience getter for easy access to form fields
  public get fields() {
    return this.formGroup.controls;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly defaultService: UserProfileService,
  ) {}

  public ngOnInit() {
    //  this.routeDataSubscription = this.route.data.subscribe((data: { : RequestPasswordRecoveryViewModel }) => {
    //    this.currentModel = data.;
    //    if (this.currentModel)
    this.createForm();
    //  });
    //  this.loadLists();
  }

  private loadLists() {}

  //Validate the control
  public get isValid(): boolean {
    return this.formGroup.valid;
  }

  //Applied to a new form
  //Requires unsubscribe
  public createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      userName: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl('')
      // captchaCode: new FormControl(this.currentModel.captchaCode, Validators.required),
    });

    //Change event subscriptions
  }

  //Applied after the model saved
  public updateForm() {
    this.formGroup.patchValue({
      email: this.currentModel.email,
    });
  }

  //Update the model with the form values
  private applyForm() {
    this.currentModel.email = this.formGroup.controls['email'].value;
    this.currentModel.userName = this.formGroup.controls['userName'].value;
    this.currentModel.firstName = this.formGroup.controls['firstName'].value;
    this.currentModel.lastName = this.formGroup.controls['lastName'].value;
  }

  //Save the model and update it from the service
  public resetPassword() {
    this.submitted = true;
    if (this.isValid) {
      //  this.applyForm();
      this.isSubmitting = true;
      this.formGroup.disable();
      this.isEmailSent = true;
      this.defaultService
        .requestPasswordRecovery(
          this.formGroup.controls['email'].value,
          this.formGroup.controls['userName'].value,
          this.formGroup.controls['firstName'].value,
          this.formGroup.controls['lastName'].value)
        .subscribe((res) => {
          //this.isEmailSent = true;
        });
      //  this.defaultService.save(this.currentModel).subscribe(res => {
      //    this.isSubmitting = false;
      //    this.formGroup.enable();
      //    this.notificationService.showSuccess("RequestPasswordRecoveryViewModel was successfully saved");
      //    //this.currentModel = res;
      //    //this.updateForm();
      //    this.router.navigateByUrl(`/users/${res.uid}`);
      //  },
      //    err => {
      //      if (err.status === 401) {
      //        /*
      //        const dialogRef = this.dialog.open(ErrorDialogComponent, {
      //          data: {
      //            title: "Operation error",
      //            content: "You are not authorized to perform this action."
      //          }
      //        });

      //        dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl("home"));*/
      //        this.notificationService.showErrorMessage(MessageCodes.NotAuthorizedError);
      //        this.router.navigateByUrl("/");
      //      }
      //      this.isSubmitting = false;
      //      this.formGroup.enable();
      //      throw err;
      //    }
      //  );
    }
  }

  onFocus() {
    this.submit.nativeElement.focus();
  }

  //Unsubscribe from subscriptions here
  public ngOnDestroy() {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
  }
}
