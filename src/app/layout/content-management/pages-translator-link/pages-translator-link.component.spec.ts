import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesTranslatorLinkComponent } from './pages-translator-link.component';

describe('PagesTranslatorLinkComponent', () => {
  let component: PagesTranslatorLinkComponent;
  let fixture: ComponentFixture<PagesTranslatorLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesTranslatorLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesTranslatorLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
