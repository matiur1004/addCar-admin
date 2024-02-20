import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PagerService } from '@app-shared/common/pager.service';
import { UserProfileService } from '@app-shared/services/user/user-profile.service';
import { SpinnerOverlayService } from '@app-shared/services/spinner-overlay.service';
import { NotificationService } from '@app-shared/services/notification.service';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  const mockedActivatedRoute = {
    data: of({ userProfiles: {} }),
    snapshot: { params: { uid: 'mocked.uid' } },
  };
  const mockedDialogRef = {
    afterClosed() {
      return of({});
    },
  };
  const mockedDialog = { open: jasmine.createSpy('open').and.returnValue(mockedDialogRef) };
  const mockedNotificationService = {
    showError: jasmine.createSpy('showError'),
    showSuccess: jasmine.createSpy('showSuccess'),
    showWarning: jasmine.createSpy('showWarning'),
  };
  const mockedUserProfileService = {
    deactivateUser: jasmine.createSpy('deactivateUser').and.returnValue(of({})),
    deleteUserProfile: jasmine.createSpy('deleteUserProfile').and.returnValue(of({})),
    getUserProfiles: jasmine.createSpy('getUserProfiles').and.returnValue(of({})),
    resendInvitation: jasmine.createSpy('resendInvitation').and.returnValue(of({})),
  };
  const mockedPagerService = {
    getPager: jasmine.createSpy('getPager').and.returnValue({ pages: [] }),
  };
  const mockedSpinnerOverlayService = {
    hide: jasmine.createSpy('hide'),
    show: jasmine.createSpy('show'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockedActivatedRoute },
        { provide: MatDialog, useValue: mockedDialog },
        { provide: NotificationService, useValue: mockedNotificationService },
        { provide: PagerService, useValue: mockedPagerService },
        { provide: UserProfileService, useValue: mockedUserProfileService },
        { provide: SpinnerOverlayService, useValue: mockedSpinnerOverlayService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
