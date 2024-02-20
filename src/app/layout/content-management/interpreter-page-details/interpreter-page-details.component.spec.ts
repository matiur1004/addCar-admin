import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterPageDetailsComponent } from './interpreter-page-details.component';

describe('InterpreterPageDetailsComponent', () => {
  let component: InterpreterPageDetailsComponent;
  let fixture: ComponentFixture<InterpreterPageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterPageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterPageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
