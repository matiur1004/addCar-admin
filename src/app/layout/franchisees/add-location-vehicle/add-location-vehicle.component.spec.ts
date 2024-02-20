import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationVehicleComponent } from './add-location-vehicle.component';

describe('AddLocationVehicleComponent', () => {
  let component: AddLocationVehicleComponent;
  let fixture: ComponentFixture<AddLocationVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLocationVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocationVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
