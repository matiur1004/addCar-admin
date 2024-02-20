import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { UserSetPasswordComponent } from './user-set-password.component';

describe('UserSetPasswordComponent', () => {
  let component: UserSetPasswordComponent;
  let fixture: ComponentFixture<UserSetPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSetPasswordComponent],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(UserSetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
