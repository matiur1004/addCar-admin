// Code behind logic for AddLocationVehicleComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Converters } from '@app-shared/common/converters';
import { AutocompleteHelper } from '@app-shared/services/autocomplete.helper';
import { AppValidators } from 'app/shared/common/app-validators';
import { ListPageWrapper } from 'app/shared/common/list-page-wrapper.model';
import { VehicleCategoryListItem } from 'app/shared/models/vehicle/vehicle-category-list-item.model';
import { VehicleListItem } from 'app/shared/models/vehicle/vehicle-list-item.model';
import { VehicleCategoryService } from 'app/shared/services/vehicle/vehicle-category.service';
import { Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../../shared/services/vehicle/vehicle.service';

@Component({
  selector: 'app-add-location-vehicle',
  templateUrl: './add-location-vehicle.component.html'
})

export class AddLocationVehicleComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;

  public vehicleHelper: AutocompleteHelper<VehicleListItem>;
  public categoriesSource: VehicleCategoryListItem[] = [];

  submitted = false;


  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  // convenience getter for easy access to form fields
  get fields() { return this.formGroup.controls; }

  constructor(private formBuilder: FormBuilder, private vehicleService: VehicleService, private vehicleCategoryService: VehicleCategoryService,) {
    this.vehicleHelper = new AutocompleteHelper<VehicleListItem>();
    this.vehicleHelper.loader = (name) => this.vehicleService.findVehicles(name);
    this.vehicleHelper.filter = (term, list) => AutocompleteHelper.vehiclesListFilter(term, list);
    this.vehicleHelper.formatter = (result) => result.modelName;

  }

  ngOnInit() {
    this.createForm();
    this.loadLists();
    
  }

  private loadLists() {
    this.vehicleCategoryService.loadVehicleCategories(null).subscribe((res) => {
      this.categoriesSource = res;
    });
  }

  //Applied to a new form
  //Requires unsubscribe
  createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      category: new FormControl(),
      model: new FormControl('', [Validators.required]),


    });

    //Change event subscriptions

  }


  //Save the model and update it from the service
  save() {
    this.submitted = true;
    let formData = this.formGroup.value;
    if (this.isValid()) {
      this.vehicleCategoryService.addVehicleToCategory(formData['category']['uid'], formData['model']['uid']).subscribe(() => {
        this.loadLists();
        this.formGroup.reset();
      });
    }
  }

  enable() {
    this.formGroup.enable();
  }

  disable() {
    this.formGroup.disable();
  }

  //Validate the control
  isValid(): boolean {
    const result = this.formGroup.valid;
    if(result) {
      let vehicle = this.formGroup.value.model;
      if(typeof vehicle == 'string') return false;
    }
    return result;
  }

  searchCategory(event: any): void {
    // const query = event.target.value;
    // if (query) {
    //   this.categoriesSource = this.categoriesSource.filter((item) => item.code.toLowerCase().includes(query));
    // } else {
    //   this.loadLists();
    // }
  }
  
  //Unsubscribe from subscriptions here
  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
