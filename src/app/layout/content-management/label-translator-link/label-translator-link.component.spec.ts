import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelTranslatorLinkComponent } from './label-translator-link.component';

describe('LabelTranslatorLinkComponent', () => {
  let component: LabelTranslatorLinkComponent;
  let fixture: ComponentFixture<LabelTranslatorLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelTranslatorLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelTranslatorLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
