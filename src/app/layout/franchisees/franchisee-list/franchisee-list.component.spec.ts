import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PagerService } from '@app-shared/common/pager.service';
import { FranchiseeService } from '@app-shared/services/franchisee/franchisee.service';
import { GlobalService } from '@app-shared/services/global.service';
import { NotificationService } from '@app-shared/services/notification.service';
import { SpinnerOverlayService } from '@app-shared/services/spinner-overlay.service';

import { FranchiseeListComponent } from './franchisee-list.component';

describe('FranchiseeListComponent', () => {
  let component: FranchiseeListComponent;
  let fixture: ComponentFixture<FranchiseeListComponent>;
  const mockedActivatedRoute = {
    data: of({ franchisees: {} }),
  };
  const mockedNotificationService = {
    showSuccessMessage: jasmine.createSpy('showSuccessMessage'),
  };
  const mockedFranchiseeService = {
    deleteFranchisee: jasmine.createSpy('deleteFranchisee').and.returnValue(of({})),
    getFranchisees: jasmine.createSpy('getFranchisees').and.returnValue(of({})),
  };
  const mockedGlobalService = {
    emitFranchiseeDetail: jasmine.createSpy('emitFranchiseeDetail'),
  };
  const mockedPagerService = {
    getPager: jasmine.createSpy('getPager').and.returnValue({ pages: [] }),
  };
  const mockedSpinnerOverlayService = {
    show: jasmine.createSpy('show'),
    hide: jasmine.createSpy('hide'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FranchiseeListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockedActivatedRoute },
        { provide: FranchiseeService, useValue: mockedFranchiseeService },
        { provide: NotificationService, useValue: mockedNotificationService },
        { provide: GlobalService, useValue: mockedGlobalService },
        { provide: PagerService, useValue: mockedPagerService },
        { provide: SpinnerOverlayService, useValue: mockedSpinnerOverlayService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(FranchiseeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
