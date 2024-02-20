import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterViewLabelListComponent } from './interpreter-view-label-list.component';

describe('InterpreterViewLabelListComponent', () => {
  let component: InterpreterViewLabelListComponent;
  let fixture: ComponentFixture<InterpreterViewLabelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterViewLabelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterViewLabelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
