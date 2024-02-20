import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterCreateLabelsLinkComponent } from './interpreter-create-labels-link.component';

describe('InterpreterCreateLabelsLinkComponent', () => {
  let component: InterpreterCreateLabelsLinkComponent;
  let fixture: ComponentFixture<InterpreterCreateLabelsLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterCreateLabelsLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterCreateLabelsLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
