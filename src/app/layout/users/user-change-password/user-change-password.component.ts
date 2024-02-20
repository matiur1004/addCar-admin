// Code behind logic for UserChangePasswordComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PasswordViewModel } from '@app-shared/models/password-view-model.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserProfileService} from '@app-shared/services/user/user-profile.service';
import {NotificationService} from "@app-shared/services/notification.service";
import {MessageCodes} from "@app-shared/models/system/message-codes";
import {ActivatedRoute} from "@angular/router";
import { PasswordService } from '../../../shared/services/system/password.service';

@Component({
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit, OnDestroy {
  public currentModel: PasswordViewModel;
  public formGroup: FormGroup;
  public submitted = false;
  public isSubmitting = false;
  public randomPassword: string;
  public userId: string;

  public get fields()  {
    return this.formGroup.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private userProfile: UserProfileService,
    private dialogRef: MatDialogRef<UserChangePasswordComponent>,
    private passwordService: PasswordService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  public ngOnInit() {
    this.formGroup = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validator: this.checkIfMatchingPasswords('newPassword', 'confirmPassword')});
    this.currentModel = new PasswordViewModel();
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
      passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      }
    };
  }

  private applyForm() {
    this.currentModel.currentPassword = this.formGroup.value.currentPassword;
    this.currentModel.newPassword = this.formGroup.value.newPassword;
  }

  changePassword() {
    this.applyForm();
    this.userProfile.updatePassword(this.currentModel).subscribe((values) => {
        this.notificationService.showSuccessMessage(MessageCodes.UserProfileChangePasswordSuccess);
      },
      (err) => {
        this.notificationService.showErrorMessage(MessageCodes.UserProfileChangePasswordError);
      });
  }

  generatePassword() {
    const randomPassword = this.passwordService.generatePassword();
    this.fields.newPassword.setValue(randomPassword);
    this.fields.confirmPassword.setValue(randomPassword);
  }

  close(result) {
    this.dialogRef.close(result);
  }

  public ngOnDestroy() {
  }
}
