import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationVehicleListComponent } from './location-vehicle-list.component';

describe('LocationVehicleListComponent', () => {
  let component: LocationVehicleListComponent;
  let fixture: ComponentFixture<LocationVehicleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationVehicleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
