// Code behind logic for UserProfileEditComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRoles, MailAddressTypes } from '@app-shared/models/enums';
import { UserProfileViewModel } from '@app-shared/models/user-profile-view-model.model';
import { ClientControlValidators } from '../../../shared/common/client-control-validators';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css'],
})
export class UserProfileEditComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public userRoles = UserRoles;
  public mailAddressTypes = MailAddressTypes;

  private _currentModel: UserProfileViewModel;

  @Input('inputModel')
  public set currentModel(val: UserProfileViewModel) {
    this._currentModel = val;
    if (val && this.formGroup) {
      this.updateForm();
    }
  }

  public get currentModel(): UserProfileViewModel {
    return this._currentModel;
  }
  public get isAltEmailRequired(): boolean {
    return (
      this.formGroup.controls['correspondenceEmail'].value === MailAddressTypes.AlternativeEmail
    );
  }

  public submitted = false;

  private correspondenceEmailChangeHandler; //This handler is called when correspondenceEmail control changed

  // convenience getter for easy access to form fields
  public get fields() {
    return this.formGroup.controls;
  }

  constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit() {
    if (this.currentModel) this.createForm();
  }

  //Applied to a new form
  //Requires unsubscribe
  public createForm() {
    const model = this.currentModel;
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      firstName: [model?.firstName, Validators.required],
      lastName: [model?.lastName, Validators.required],
      email: [model?.email, [Validators.required, Validators.email]],
      alternativeEmail: [model?.alternateEmail, Validators.email],
        correspondenceEmail: [model?.correspondenceEmail],
        telephone: [model?.phoneNumber, [Validators.required, ClientControlValidators.phoneValidator]],
    });

    this.arrangeValidators();

    //if (this.isCurrentProfile) {
    this.fields.email.disable();

    //}

    //Change event subscriptions

    this.correspondenceEmailChangeHandler = this.formGroup.controls[
      'correspondenceEmail'
    ].valueChanges.subscribe((correspondenceEmailValue) => {
      this.arrangeValidators();
    });
  }

  //Applied after the model saved
  public updateForm() {
    this.formGroup.patchValue({
      firstName: this.currentModel.firstName,
      lastName: this.currentModel.lastName,
      email: this.currentModel.email,
      alternativeEmail: this.currentModel.alternateEmail,
      correspondenceEmail: this.currentModel.correspondenceEmail,
      telephone: this.currentModel.phoneNumber,
    });
  }

  //Update the model with the form values
  private applyForm() {
    this.currentModel.firstName = this.formGroup.controls['firstName'].value;
    this.currentModel.lastName = this.formGroup.controls['lastName'].value;
    this.currentModel.email = this.formGroup.controls['email'].value;
    this.currentModel.alternateEmail = this.formGroup.controls['alternativeEmail'].value;
    this.currentModel.correspondenceEmail = this.formGroup.controls['correspondenceEmail'].value;
    this.currentModel.phoneNumber = this.formGroup.controls['telephone'].value;
  }

  //Save the model and update it from the service
  save(): boolean {
    this.submitted = true;
    if (this.isValid) {
      this.applyForm();
      return true;
    }
    return false;
  }

  private arrangeValidators() {
    const correspondenceEmailValue = this.formGroup.controls['correspondenceEmail'].value;
    this.formGroup.controls['alternativeEmail'].clearValidators();
    if (correspondenceEmailValue === MailAddressTypes.AlternativeEmail) {
      this.formGroup.controls['alternativeEmail'].setValidators(
        Validators.compose([Validators.required, Validators.email]),
      );
    } else {
      this.formGroup.controls['alternativeEmail'].setValidators(Validators.email);
    }
    this.formGroup.controls['alternativeEmail'].updateValueAndValidity();
  }

  //Validate the control
  public get isValid(): boolean {
    return this.formGroup.valid;
  }

  enable() {
    this.formGroup.enable();
  }

  disable() {
    this.formGroup.disable();
  }

  //Unsubscribe from subscriptions here
  ngOnDestroy() {
    if (this.correspondenceEmailChangeHandler) this.correspondenceEmailChangeHandler.unsubscribe();
  }
}
