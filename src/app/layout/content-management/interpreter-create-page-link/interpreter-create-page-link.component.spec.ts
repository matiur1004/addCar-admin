import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterCreatePageLinkComponent } from './interpreter-create-page-link.component';

describe('InterpreterCreatePageLinkComponent', () => {
  let component: InterpreterCreatePageLinkComponent;
  let fixture: ComponentFixture<InterpreterCreatePageLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterCreatePageLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterCreatePageLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
