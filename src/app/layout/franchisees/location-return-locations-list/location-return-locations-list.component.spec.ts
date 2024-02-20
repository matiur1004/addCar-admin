import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationReturnLocationsListComponent } from './location-return-locations-list.component';

describe('LocationReturnLocationsListComponent', () => {
  let component: LocationReturnLocationsListComponent;
  let fixture: ComponentFixture<LocationReturnLocationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationReturnLocationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationReturnLocationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
