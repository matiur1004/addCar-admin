import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { FranchiseeService } from '@app-shared/services/franchisee/franchisee.service';
import { GlobalService } from '@app-shared/services/global.service';
import { NotificationService } from '@app-shared/services/notification.service';

import { FranchiseeDetailsComponent } from './franchisee-details.component';

describe('FranchiseeDetailsComponent', () => {
  let component: FranchiseeDetailsComponent;
  let fixture: ComponentFixture<FranchiseeDetailsComponent>;
  const mockedActivatedRoute = {
    data: of({ franchisee: {} }),
    params: of({}),
  };
  const mockedNotificationService = {
    showErrorMessage: jasmine.createSpy('showErrorMessage'),
    showSuccessMessage: jasmine.createSpy('showSuccessMessage'),
  };
  const mockedFranchiseeService = {
    saveFranchisee: jasmine.createSpy('saveFranchisee').and.returnValue(of({})),
  };
  const mockedGlobalService = {
    emitFranchiseeDetail: jasmine.createSpy('emitFranchiseeDetail'),
  };
  const mockedRouter = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FranchiseeDetailsComponent],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: mockedActivatedRoute },
        { provide: FranchiseeService, useValue: mockedFranchiseeService },
        { provide: NotificationService, useValue: mockedNotificationService },
        { provide: GlobalService, useValue: mockedGlobalService },
        { provide: Router, useValue: mockedRouter },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(FranchiseeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
