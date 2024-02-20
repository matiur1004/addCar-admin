// Code behind logic for CountryDetailsComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, OnInit, ErrorHandler, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '@app-shared/services/notification.service';
import { Converters } from '@app-shared/common/converters';
import { ClientControlValidators } from '@app-shared/common/client-control-validators';
import { CountryViewModel } from '../../../shared/models/country/country-view-model.model';
import { CountryService } from '../../../shared/services/franchisee/country.service';
import { VehicleCategoryListItem } from 'app/shared/models/vehicle/vehicle-category-list-item.model';
import { CountryCategorySetupViewModel } from 'app/shared/models/country/country-category-setup-view-model.model';
import { CountryListItem } from 'app/shared/models/franchisee/country-list-item.model';
import { CountryCategorySettingsComponent } from '../country-category-settings/country-category-settings.component';

@Component({
  templateUrl: './country-details.component.html',
})

export class CountryDetailsComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public categoriesSource: VehicleCategoryListItem[] = [];
  public fullCategoriesSource: VehicleCategoryListItem[] = [];

  currentModel: CountryViewModel;
  submitted = false;
  isSubmitting = false;
  categoryDetail: CountryCategorySetupViewModel;
  selectedCategory: VehicleCategoryListItem;
  allowedCountries: CountryListItem[];
  invalidCategory: CountryCategorySetupViewModel;
  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver
  // convenience getter for easy access to form fields
  get fields() { return this.formGroup.controls; }

  @ViewChild('categorySettingForm') _categorySettingFormView: CountryCategorySettingsComponent;

  constructor(private formBuilder: FormBuilder,
    private defaultService: CountryService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandler) {

  }

  ngOnInit() {
    this.routeDataSubscription = this.route.data.subscribe((data: { country: CountryViewModel }) => {
      this.currentModel = data.country;
      if (this.currentModel)
        this.createForm();
    });
    this.loadAllowedCountries();
    this.loadCategories();
    this.loadLists();
  }

  onCategoryChange(event) {
    let category = event.value;
    if (category && category.uid) {
      this.selectedCategory = category;
      this.loadVehicleCategoryDetail(category.uid);
    }
  }

  onCountryCategory(event: CountryCategorySetupViewModel) {
    // console.log(event);
    // this.currentModel.categorySetups = this.currentModel.categorySetups.map(category => {
    //   if(category.uid == event.uid) category = event;
    //   return category;
    // })
    // console.log(this.currentModel.categorySetups);
  }

  private loadLists() {

  }

  private loadVehicleCategoryDetail(uid: string) {
    let categoryItem = this.currentModel.categorySetups.find((item) => item.categoryUID == uid);
    if (categoryItem) {
      this.categoryDetail = categoryItem;
      return;
    }
    this.defaultService.getCountryCategorySettings(this.defaultService.countryId, uid).subscribe(category => {
      this.categoryDetail = category;
      this.currentModel.categorySetups.push(category);
    })
  }

  private loadAllowedCountries() {
    this.defaultService.loadAllowedCountries(this.defaultService.countryId).subscribe((countries: CountryListItem[]) => {
      this.allowedCountries = countries;
    });
  }

  private loadCategories() {
    this.defaultService.loadCountryVehicleCategories(this.defaultService.countryId).subscribe((categories: VehicleCategoryListItem[]) => {
      this.categoriesSource = categories;
      this.fullCategoriesSource = categories;
    })
  }

  //Applied to a new form
  //Requires unsubscribe
  createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      refuelCharge: new FormControl(this.currentModel.refuelCharge, Validators.compose([Validators.max(10000), Validators.min(0), ClientControlValidators.isValidFloatNumber])),
      missingFuelCharge: new FormControl(this.currentModel.missingFuelCharge, Validators.compose([Validators.max(100000), Validators.min(0), ClientControlValidators.isValidFloatNumber])),
      penalty: new FormControl(this.currentModel.penalty, Validators.compose([Validators.max(100000), Validators.min(0), ClientControlValidators.isValidFloatNumber])),
      category: new FormControl('')
    });

    //Change event subscriptions



  }

  //Applied after the model saved
  updateForm() {
    this.formGroup.patchValue({
      refuelCharge: this.currentModel.refuelCharge,
      missingFuelCharge: this.currentModel.missingFuelCharge,
      penalty: this.currentModel.penalty,


    });
  }

  //Update the model with the form values
  private applyForm() {
    this.currentModel.refuelCharge = this.formGroup.controls["refuelCharge"].value;
    this.currentModel.missingFuelCharge = this.formGroup.controls["missingFuelCharge"].value;
    this.currentModel.penalty = this.formGroup.controls["penalty"].value;

  }

  //Save the model and update it from the service
  save() {
    this.submitted = true;
    if (this.isValid()) {
      this.applyForm();
      this.isSubmitting = true;
      this.invalidCategory = null;
      this.currentModel.categorySetups.forEach(category => {
        if (category.status == false && !this.invalidCategory) {
          this.invalidCategory = category;
          this.categoryDetail = this.invalidCategory;
          this.selectedCategory = this.categoriesSource.find(item => item.uid == this.invalidCategory.categoryUID);
          this.formGroup.get('category').setValue(this.selectedCategory);
          this.isSubmitting = false;
        }
      })
      if (!this.invalidCategory) {
        this.formGroup.disable();
        this.defaultService.saveCountry(this.currentModel).subscribe(res => {
          this.isSubmitting = false;
          this.formGroup.enable();
          this.notificationService.showSuccess("CountryViewModel was successfully saved");
        },
          err => {
            if (err.status === 401) {
              this.notificationService.showError("You are not authorized to perform this action");
              this.router.navigateByUrl("/");
            }
            this.isSubmitting = false;
            this.formGroup.enable();
            throw err;
          }
        );
      }

    }
  }
  searchCategory(event: any): void {
    const query = event.target.value;
    if (query) {
      this.categoriesSource = this.fullCategoriesSource.filter((item) => {
        if (item.code.toLowerCase().includes(query.toLowerCase())) {
          return item;
        }

      });
    } else {
      this.categoriesSource = this.fullCategoriesSource;
    }
  }

  //Validate the control
  isValid(): boolean {
    const result = this.formGroup.valid;
    return result;
  }

  //Unsubscribe from subscriptions here
  ngOnDestroy() {
    if (this.routeDataSubscription)
      this.routeDataSubscription.unsubscribe();


  }
}
