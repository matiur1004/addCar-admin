import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterLabelsComponent } from './interpreter-labels.component';

describe('InterpreterLabelsComponent', () => {
  let component: InterpreterLabelsComponent;
  let fixture: ComponentFixture<InterpreterLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
