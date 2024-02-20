import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { MockedUserRolesTranslatePipe } from '@app-shared/pipes/mock-user-roles-translate/mock-user-roles-translate';
import { UserProfileService } from '@app-shared/services/user/user-profile.service';
import { NotificationService } from '@app-shared/services/notification.service';

import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  const mockedActivatedRoute = {
    data: of({ userProfile: {} }),
    snapshot: { params: { uid: 'mocked.uid' } },
  };
  const mockedMatDialog = {
    open: jasmine.createSpy('open'),
  };
  const mockedNotificationService = {
    showSuccessMessage: jasmine.createSpy('showSuccessMessage'),
    showErrorMessage: jasmine.createSpy('showErrorMessage'),
  };
  const mockedUserProfileService = {
    saveUserProfile: jasmine
      .createSpy('saveUserProfile')
      .and.returnValue(of({ uid: 'mocked.uid' })),
  };
  const mockedRouter = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailsComponent, MockedUserRolesTranslatePipe],
      providers: [
        { provide: ActivatedRoute, useValue: mockedActivatedRoute },
        { provide: MatDialog, useValue: mockedMatDialog },
        { provide: NotificationService, useValue: mockedNotificationService },
        { provide: Router, useValue: mockedRouter },
        { provide: UserProfileService, useValue: mockedUserProfileService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
