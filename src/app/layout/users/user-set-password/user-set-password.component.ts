// Code behind logic for UserSetPasswordComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PasswordService } from '../../../shared/services/system/password.service';
import {NotificationService} from "@app-shared/services/notification.service";
import {MessageCodes} from "@app-shared/models/system/message-codes";

@Component({
  selector: 'app-user-set-password',
  templateUrl: './user-set-password.component.html',
})
export class UserSetPasswordComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public submitted = false;
  public isSubmitting = false;
  public randomPassword: string;
  // convenience getter for easy access to form fields
  public get fields() {
    return this.formGroup.controls;
  }

  constructor(private readonly formBuilder: FormBuilder, private passwordService: PasswordService, private notificationService: NotificationService) { }

  public ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.formGroup = this.formBuilder.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_#$^+=!*()@%&]).{8,}$'),
          ],
        ],
        confirmPassword: ['', Validators.required],
        userPassword: ['']
      },
      { validators: this.checkPasswords },
    );
  }

  public checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('newPassword').value;
    const confirmPass = group.get('confirmPassword').value;
    group.get('confirmPassword').setErrors(pass === confirmPass ? null : { notSame: true });
    return null;
  };

  copyPassword(){
      window.navigator.clipboard.writeText(this.formGroup.value['newPassword']).then(() => {
        this.notificationService.showSuccessMessage(MessageCodes.PasswordCopySuccess);
      });
  }

  public isValid(): boolean {
    const result = this.formGroup.valid;
    return result;
  }

  public generatePassword() {
    const randomPassword = this.passwordService.generatePassword();
    this.fields.newPassword.setValue(randomPassword);
    this.fields.confirmPassword.setValue(randomPassword);
    this.fields.userPassword.setValue(randomPassword);
  }

  //Unsubscribe from subscriptions here
  public ngOnDestroy() {}

}
