import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { VehicleSearchComponent } from './vehicle-search.component';

describe('VehicleSearchComponent', () => {
  let component: VehicleSearchComponent;
  let fixture: ComponentFixture<VehicleSearchComponent>;
  const mockedActivatedRoute = {
    queryParams: of({ searchText: 'mocked text' }),
  };
  const mockedRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  beforeEach(() => { 
    TestBed.configureTestingModule({
      declarations: [VehicleSearchComponent], providers: [
        { provide: ActivatedRoute, useValue: mockedActivatedRoute },
        { provide: Router, useValue: mockedRouter },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
