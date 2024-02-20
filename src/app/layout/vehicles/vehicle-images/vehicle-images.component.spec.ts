import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleImagesComponent } from './vehicle-images.component';

describe('VehicleImagesComponent', () => {
  let component: VehicleImagesComponent;
  let fixture: ComponentFixture<VehicleImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
