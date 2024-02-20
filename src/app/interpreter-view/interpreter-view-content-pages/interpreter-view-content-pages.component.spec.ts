import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterViewContentPagesComponent } from './interpreter-view-content-pages.component';

describe('InterpreterViewContentPagesComponent', () => {
  let component: InterpreterViewContentPagesComponent;
  let fixture: ComponentFixture<InterpreterViewContentPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterViewContentPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterViewContentPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
