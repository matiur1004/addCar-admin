import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GracePeriodFilterComponent } from './grace-period-filter.component';

describe('GracePeriodFilterComponent', () => {
  let component: GracePeriodFilterComponent;
  let fixture: ComponentFixture<GracePeriodFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GracePeriodFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GracePeriodFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
