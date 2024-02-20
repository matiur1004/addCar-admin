// Code behind logic for UserInviteComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { UserRoles } from '@app-shared/models/enums';
import { InviteUserViewModel } from '@app-shared/models/invite-user-view-model.model';
import { NotificationService } from '@app-shared/services/notification.service';
import { UserProfileService } from '@app-shared/services/user/user-profile.service';
import { AutocompleteHelper } from '@app-shared/services/autocomplete.helper';
import { FranchiseeShortListItem } from '@app-shared/models/franchisee-short-list-item.model';
import { SubFranchiseeListItem } from '@app-shared/models/sub-franchisee-list-item.model';
import { FranchiseeService } from '@app-shared/services/franchisee/franchisee.service';
import { SubFranchiseeService } from '@app-shared/services/franchisee/sub-franchisee.service';
import { AppValidators } from '@app-shared/common/app-validators';
import { MessageCodes } from '@app-shared/models/system/message-codes';
import { AuthService } from '../../../shared/services/auth.new.service';

@Component({
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.css'],
})
export class UserInviteComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public userRoles = UserRoles;
  public sentSuccess = false;

  public franchiseeNameHelper: AutocompleteHelper<FranchiseeShortListItem>;
  public subfranchiseeNameHelper: AutocompleteHelper<SubFranchiseeListItem>;

  public currentModel: InviteUserViewModel;
  public submitted = false;
  public isSubmitting = false;
  public isFranchiseeNameRequired = true;
  private currentFranchiseeUid: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly defaultService: UserProfileService,
    private readonly franchiseeService: FranchiseeService,
    private readonly subfranchiseeService: SubFranchiseeService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
  ) {
    this.franchiseeNameHelper = new AutocompleteHelper<FranchiseeShortListItem>();
    this.franchiseeNameHelper.loader = (name) => this.franchiseeService.findFranchisees(name);
    this.franchiseeNameHelper.filter = (term, list) =>
      AutocompleteHelper.franchiseeListFilter(term, list);
    this.franchiseeNameHelper.formatter = (result) => result.name;
    this.subfranchiseeNameHelper = new AutocompleteHelper<SubFranchiseeListItem>();
    this.subfranchiseeNameHelper.loader = (name) =>
      this.subfranchiseeService.findSubfranchisees(this.currentFranchiseeUid, name);
    this.subfranchiseeNameHelper.filter = (term, list) =>
      AutocompleteHelper.subFranchiseeListFilter(term, list);
    this.subfranchiseeNameHelper.formatter = (result) => result.name;
  }

  public ngOnInit() {
    this.createForm();
  }
  // convenience getter for easy access to form fields
  public get fields() {
    return this.formGroup.controls;
  }

  //Applied to a new form
  //Requires unsubscribe

  public createForm() {
    this.formGroup = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      role: [UserRoles.FranchiseeUser, Validators.required],
      franchiseeName: [
        null,
        [Validators.required, AppValidators.autoComplateItemExist(this.franchiseeNameHelper)],
      ],
      subfranchiseeName: [],
    });

    //Change event subscriptions

    this.formGroup.controls['role'].valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((roleValue) => {
        if (roleValue === UserRoles.AddCarAdmin || roleValue === UserRoles.AddCarUser) {
          this.fields['franchiseeName'].reset();
          this.fields['franchiseeName'].clearValidators();
          this.fields['franchiseeName'].updateValueAndValidity();
          this.fields['franchiseeName'].disable();
          this.isFranchiseeNameRequired = false;
          

          this.fields['subfranchiseeName'].reset();
          this.fields['subfranchiseeName'].clearValidators();
          this.fields['subfranchiseeName'].updateValueAndValidity();
          this.fields['subfranchiseeName'].disable();
        } else {
          this.fields['franchiseeName'].enable();
          this.fields['franchiseeName'].setValidators([Validators.required, AppValidators.autoComplateItemExist(this.franchiseeNameHelper)]);
          this.fields['franchiseeName'].updateValueAndValidity();
          this.fields['subfranchiseeName'].enable();
          this.isFranchiseeNameRequired = true;


        }
      });

    this.formGroup.controls['franchiseeName'].valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((franchiseeNameValue) => {
        if (franchiseeNameValue?.uid) {
          this.currentFranchiseeUid = franchiseeNameValue.uid;
          if (this.fields['role'].value === UserRoles.FranchiseeUser || this.fields['role'].value === UserRoles.FranchiseeAdmin)
            this.fields['subfranchiseeName'].enable();
        } else {
          this.currentFranchiseeUid = null;
          this.fields['subfranchiseeName'].reset();
          this.fields['subfranchiseeName'].disable();
        }
      });

    this.formGroup.controls['subfranchiseeName'].valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((subfranchiseeNameValue) => {
        //TODO: put your logic here
        //console.log("Field change: subfranchiseeName='" + subfranchiseeNameValue + "'");
      });
  }

  //Update the model with the form values
  private applyForm() {
    const formValue = this.formGroup.value;
    this.currentModel = { email: formValue.email, role: formValue.role } as InviteUserViewModel;
    if (this.currentFranchiseeUid) {
      this.currentModel.franchiseeUID = this.currentFranchiseeUid;
      if (formValue.subfranchiseeName?.uid)
        this.currentModel.subfranchiseeUID = formValue.subfranchiseeName?.uid;
    }
  }

  //Save the model and update it from the service
  public save() {
    this.submitted = true;
    if (this.isValid) {
      this.applyForm();
      this.isSubmitting = true;
      this.formGroup.disable();
      this.defaultService
        .inviteUser(this.currentModel)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (res) => {
            this.isSubmitting = false;
            this.formGroup.enable();
            this.sentSuccess = true;
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
  }

  //Validate the control
  public get isValid(): boolean {
    return this.formGroup.valid;
  }

  //Unsubscribe from subscriptions here
  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  public inviteAgain() {
    this.submitted = false;
    this.sentSuccess = false;
    this.formGroup.reset();
  }
}
