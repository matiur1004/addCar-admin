import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { UserLocationTreeComponent } from './user-location-tree.component';

describe('UserLocationTreeComponent', () => {
  let component: UserLocationTreeComponent;
  let fixture: ComponentFixture<UserLocationTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLocationTreeComponent],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(UserLocationTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
