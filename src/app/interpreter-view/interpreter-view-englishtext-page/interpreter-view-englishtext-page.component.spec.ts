import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterViewEnglishtextPageComponent } from './interpreter-view-englishtext-page.component';

describe('InterpreterViewEnglishtextPageComponent', () => {
  let component: InterpreterViewEnglishtextPageComponent;
  let fixture: ComponentFixture<InterpreterViewEnglishtextPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterViewEnglishtextPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterViewEnglishtextPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
