import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

import { NotificationService } from '@app-shared/services/notification.service';
import { PasswordService } from '@app-shared/services/system/password.service';
import { UserProfileService } from '@app-shared/services/user/user-profile.service';

import { UserChangePasswordComponent } from './user-change-password.component';

describe('UserChangePasswordComponent', () => {
  let component: UserChangePasswordComponent;
  let fixture: ComponentFixture<UserChangePasswordComponent>;
  const mockedMatDialogRef = {
    close: jasmine.createSpy('close'),
  };
  const mockedNotificationService = {
    showErrorMessage: jasmine.createSpy('showErrorMessage'),
    showSuccessMessage: jasmine.createSpy('showSuccessMessage'),
  };
  const mockedPasswordService = {
    generatePassword: jasmine.createSpy('generatePassword'),
  };
  const mockedUserProfileService = {
    updatePassword: jasmine.createSpy('updatePassword').and.returnValue(of({})),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserChangePasswordComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockedMatDialogRef },
        { provide: NotificationService, useValue: mockedNotificationService },
        { provide: PasswordService, useValue: mockedPasswordService },
        { provide: UserProfileService, useValue: mockedUserProfileService },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(UserChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
