import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterViewLabelsComponent } from './interpreter-view-labels.component';

describe('InterpreterViewLabelsComponent', () => {
  let component: InterpreterViewLabelsComponent;
  let fixture: ComponentFixture<InterpreterViewLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterViewLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterViewLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
