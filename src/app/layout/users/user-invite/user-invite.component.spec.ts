import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NotificationService } from '@app-shared/services/notification.service';
import { UserProfileService } from '@app-shared/services/user/user-profile.service';
import { FranchiseeService } from '@app-shared/services/franchisee/franchisee.service';
import { SubFranchiseeService } from '@app-shared/services/franchisee/sub-franchisee.service';

import { UserInviteComponent } from './user-invite.component';
import { UserRolesEnumTranslatePipe } from '@app-shared/services/pipes';

describe('UserInviteComponent', () => {
  let component: UserInviteComponent;
  let fixture: ComponentFixture<UserInviteComponent>;
  const mockedFranchiseeService = {
    findFranchisees: jasmine.createSpy('findFranchisees'),
  };
  const mockedSubFranchiseeService = {
    findSubfranchisees: jasmine.createSpy('findSubfranchisees'),
  };
  const mockedNotificationService = {
    showErrorMessage: jasmine.createSpy('showErrorMessage'),
  };
  const mockedUserProfileService = {
    inviteUser: jasmine.createSpy('inviteUser').and.returnValue(of({})),
  };
  const mockedRouter = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInviteComponent, UserRolesEnumTranslatePipe],
      providers: [
        FormBuilder,
        { provide: NotificationService, useValue: mockedNotificationService },
        { provide: FranchiseeService, useValue: mockedFranchiseeService },
        { provide: SubFranchiseeService, useValue: mockedSubFranchiseeService },
        { provide: Router, useValue: mockedRouter },
        { provide: UserProfileService, useValue: mockedUserProfileService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(UserInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
