// Code behind logic for CountryCategorySettingsComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Converters } from '@app-shared/common/converters';
import { ClientControlValidators } from '@app-shared/common/client-control-validators';
import { VehicleCategoryListItem } from '../../../shared/models/vehicle/vehicle-category-list-item.model';
import { CountryCategorySetupViewModel } from '../../../shared/models/country/country-category-setup-view-model.model';
import { CountryService } from '../../../shared/services/franchisee/country.service';

@Component({
  selector: 'app-country-category-settings',
  templateUrl: './country-category-settings.component.html'
})

export class CountryCategorySettingsComponent implements OnInit, OnDestroy, OnChanges {
  public formGroup: FormGroup;

  public categoryUIDSource: VehicleCategoryListItem[];

  public isCategoryUIDLoading = false;

  private _currentModel: CountryCategorySetupViewModel;

  @Input('inputModel')
  set currentModel(val: CountryCategorySetupViewModel) {
    this._currentModel = val;
    if (this.formGroup)
      this.updateForm(this._currentModel);
    else
      this.createForm(); 
  }

  get currentModel(): CountryCategorySetupViewModel { return this._currentModel };

  @Input() category: VehicleCategoryListItem;
  @Input() invalidCategory: CountryCategorySetupViewModel;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  submitted = true;
  isUpdating = false;
  formStatus: boolean;

  private categoryUIDChangeHandler;   //This handler is called when categoryUID control changed


  // convenience getter for easy access to form fields
  get fields() { return this.formGroup.controls; }

  constructor(private formBuilder: FormBuilder, private countryService: CountryService) {

  }

  ngOnInit() {
    if (this.currentModel)
      this.createForm();
    this.loadLists();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.invalidCategory)
    if(changes.invalidCategory && changes.invalidCategory.currentValue) {
      
      this.updateForm(changes.invalidCategory.currentValue);
      this.formStatus = false;
      this.formGroup.markAllAsTouched();
    }
  }
  private loadLists() {
    //CategoryUID
    //this.isCategoryUIDLoading = true;
    //if (this.fields)
    //  this.fields.categoryUID.disable();
    //this.countryService.loadCountryVehicleCategories(this.currentCountryUid).subscribe(res => {
    //  this.categoryUIDSource = res;
    //  this.isCategoryUIDLoading = false;
    //  if (this.fields)
    //    this.fields.categoryUID.enable();
    //});
    //End of CategoryUID

  }

  //Applied to a new form
  //Requires unsubscribe
  createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      modelName: new FormControl(this.currentModel.modelName),
      guaranteedModel: new FormControl(this.currentModel.guaranteedModel),
      guaranteedYear: new FormControl(this.currentModel.guaranteedYear),
      mileageApplication: new FormControl(this.currentModel.mileageApplication),
      fuelPolicy: new FormControl(this.currentModel.fuelPolicy),
      doors: new FormControl(this.currentModel.doors, ClientControlValidators.isValidIntegerNumber),
      passengers: new FormControl(this.currentModel.passengers, ClientControlValidators.isValidIntegerNumber),
      minDriverAge: new FormControl(this.currentModel.minDriverAge, Validators.compose([ClientControlValidators.isValidIntegerNumber, Validators.max(200), Validators.min(0)])),
      maxDriverAge: new FormControl(this.currentModel.maxDriverAge, Validators.compose([ClientControlValidators.isValidIntegerNumber, Validators.max(200), Validators.min(0)])),
      fourWD: new FormControl(this.currentModel.fourWD),
      deposit: new FormControl(this.currentModel.deposit, Validators.compose([Validators.max(100000), Validators.min(0), ClientControlValidators.isValidFloatNumber])),
    });

    //Change event subscriptions

    this.categoryUIDChangeHandler = this.formGroup.valueChanges
      .subscribe(categoryUIDValue => {
        //TODO: put your logic here  
        //console.log("Field change: categoryUID='" + categoryUIDValue + "'");
        if (!this.isUpdating)
          if(this.formGroup.valid) this.formStatus = true;
          else this.formStatus = false;
          this.applyForm();
          console.log('formStatus', this.formStatus);
      });


  }

  //Applied after the model saved
  updateForm(model: CountryCategorySetupViewModel) {
    this.isUpdating = true;
    this.formGroup.patchValue({
      modelName: model.modelName,
      guaranteedModel: model.guaranteedModel,
      guaranteedYear: model.guaranteedYear,
      mileageApplication: model.mileageApplication,
      fuelPolicy: model.fuelPolicy,
      doors: model.doors,
      passengers: model.passengers,
      minDriverAge: model.minDriverAge,
      maxDriverAge: model.maxDriverAge,
      fourWD: model.fourWD,
      deposit: model.deposit,
    });
    this.isUpdating = false;
  }

  //Update the model with the form values
  private applyForm() {
    this.currentModel.modelName = this.formGroup.controls["modelName"].value;
    this.currentModel.guaranteedModel = this.formGroup.controls["guaranteedModel"].value;
    this.currentModel.guaranteedYear = this.formGroup.controls["guaranteedYear"].value;
    this.currentModel.mileageApplication = this.formGroup.controls["mileageApplication"].value;
    this.currentModel.fuelPolicy = this.formGroup.controls["fuelPolicy"].value;
    this.currentModel.doors = this.formGroup.controls["doors"].value;
    this.currentModel.passengers = this.formGroup.controls["passengers"].value;
    this.currentModel.minDriverAge = this.formGroup.controls["minDriverAge"].value;
    this.currentModel.maxDriverAge = this.formGroup.controls["maxDriverAge"].value;
    this.currentModel.fourWD = this.formGroup.controls["fourWD"].value;
    this.currentModel.deposit = this.formGroup.controls["deposit"].value;
    this.currentModel.status = this.formStatus;
    this.onSubmit.emit(this.currentModel);
  }

  //Save the model and update it from the service
  save() {
    this.submitted = true;
    if (this.isValid()) {
      this.applyForm();
      //this.updateForm();
     // this.onSubmit.emit(this.formGroup.value);
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
    return result;
  }

  //Unsubscribe from subscriptions here
  ngOnDestroy() {
    if (this.categoryUIDChangeHandler)
      this.categoryUIDChangeHandler.unsubscribe();

  }
}
