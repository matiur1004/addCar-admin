import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseeListSearchComponent } from './franchisee-list-search.component';

describe('FranchiseeListSearchComponent', () => {
  let component: FranchiseeListSearchComponent;
  let fixture: ComponentFixture<FranchiseeListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseeListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseeListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
