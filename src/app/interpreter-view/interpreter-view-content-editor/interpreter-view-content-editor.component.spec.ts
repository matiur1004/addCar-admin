import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterViewContentEditorComponent } from './interpreter-view-content-editor.component';

describe('InterpreterViewContentEditorComponent', () => {
  let component: InterpreterViewContentEditorComponent;
  let fixture: ComponentFixture<InterpreterViewContentEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterViewContentEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterViewContentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
