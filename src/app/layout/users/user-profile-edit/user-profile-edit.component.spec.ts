import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { UserProfileEditComponent } from './user-profile-edit.component';

describe('UserProfileEditComponent', () => {
  let component: UserProfileEditComponent;
  let fixture: ComponentFixture<UserProfileEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileEditComponent, MockedMailAddressTypesPipe],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(UserProfileEditComponent);
    component = fixture.componentInstance;
    component.currentModel = {
      firstName: 'Anton',
      lastName: 'Ivanov',
      email: 'anton.ivanov@stantum.cz',
      phoneNumber: '445',
      alternateEmail: null,
      role: 0,
      applicationUserId: '9aac1862-a874-46e1-853f-22671c5e65df',
      organizationName: 'addCar',
      correspondenceEmail: 0,
      uid: 'e1e1957f-0ae2-4122-9671-97231e080b27',
      createdBy: '@Creator',
      createdDate: '0001-01-01T00:00:00',
      modifiedBy: null,
      modifiedDate: '2021-09-05T17:54:01.107975',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initForm', () => {
    it('should create a form on init', () => {
      expect(component.formGroup).toBeDefined();
    });
  });

  describe('set currentModel', () => {
    it('should set user data to form', () => {
      expect(component.formGroup.value).toEqual({
        firstName: 'Anton',
        lastName: 'Ivanov',
        // email: 'anton.ivanov@stantum.cz', // disabled
        alternativeEmail: null,
        correspondenceEmail: 0,
        telephone: '445',
      });
    });
  });

  describe('get isAltEmailRequired', () => {
    it('should return false if user email is not alternative', () => {
      expect(component.isAltEmailRequired).toBeFalsy();
    });

    it('should return true if user email is alternative', () => {
      component.formGroup.patchValue({ correspondenceEmail: 1 });

      expect(component.isAltEmailRequired).toBeTruthy();
    });
  });

  describe('save', () => {
    it('should toggle submitted state to true and set form values to currentModel', () => {
      component.submitted = false;
      component.formGroup.patchValue({ firstName: 'New name' });
      component.save();

      expect(component.currentModel.firstName).toEqual('New name');
      expect(component.submitted).toBeTruthy();
    });
  });

  describe('enable', () => {
    it('should enable formGroup', () => {
      spyOn(component.formGroup, 'enable');
      component.enable();

      expect(component.formGroup.enable).toHaveBeenCalledWith();
    });
  });

  describe('disable', () => {
    it('should disable formGroup', () => {
      spyOn(component.formGroup, 'disable');
      component.disable();

      expect(component.formGroup.disable).toHaveBeenCalledWith();
    });
  });
});
