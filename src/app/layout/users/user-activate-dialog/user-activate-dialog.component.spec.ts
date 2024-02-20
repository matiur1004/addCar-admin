import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserActivateDialogComponent } from './user-activate-dialog.component';

describe('UserActivateDialogComponent', () => {
  let component: UserActivateDialogComponent;
  let fixture: ComponentFixture<UserActivateDialogComponent>;
  const mockedMatDialogRef = {
    close: jasmine.createSpy('close'),
  };
  const mockedDialogData = {
    user: {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserActivateDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockedDialogData },
        { provide: MatDialogRef, useValue: mockedMatDialogRef },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(UserActivateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
