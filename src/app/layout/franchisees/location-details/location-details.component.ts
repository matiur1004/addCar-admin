// Code behind logic for LocationDetailsComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, OnInit, ErrorHandler, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '@app-shared/services/notification.service';
import { Converters } from '@app-shared/common/converters';
import { LocationViewModel } from '@app-shared/models/location/location-view-model.model';
import { LocationService } from '@app-shared/services/location/location.service';
import { ClientControlValidators } from '../../../shared/common/client-control-validators';

@Component({
  templateUrl: './location-details.component.html'
})

export class LocationDetailsComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;



  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver
  currentModel: LocationViewModel;
  submitted = false;
  isSubmitting = false;



  // convenience getter for easy access to form fields
  get fields() { return this.formGroup.controls; }

  constructor(private formBuilder: FormBuilder,
    private defaultService: LocationService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandler) {

  }

  ngOnInit() {
    this.routeDataSubscription = this.route.data.subscribe((data: { location: LocationViewModel }) => {
      this.currentModel = data.location;
      if (this.currentModel)
        this.createForm();
    });
    this.loadLists();
    //this.formGroup.disable();
  }

  private loadLists() {

  }

  //Applied to a new form
  //Requires unsubscribe
  createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      locationName: new FormControl(this.currentModel.name),
      countryName: new FormControl(this.currentModel.countryName),
      locationType: new FormControl(this.currentModel.locationType),
      airportCode: new FormControl(this.currentModel.airportCode),
      address: new FormControl(this.currentModel.address),
      phone: new FormControl(this.currentModel.phone),
      mobilePhone: new FormControl(this.currentModel.mobilePhone),
      latitude: new FormControl(this.currentModel.latitude),
      longitude: new FormControl(this.currentModel.longitude),
      rate: new FormControl(this.currentModel.rate, Validators.compose([Validators.required, ClientControlValidators.isValidFloatNumber, Validators.min(0), Validators.max(2000)])),
      timezone: new FormControl(this.currentModel.timezone, Validators.compose([Validators.required, ClientControlValidators.isValidIntegerNumber2, Validators.min(-12), Validators.max(12)])),
      rateCode: new FormControl(this.currentModel.rateCode, Validators.required),
      info: new FormControl(this.currentModel.info),
      isShownOnSite: new FormControl(this.currentModel.isShownOnSite),
    });

    this.disableFields();

    //Change event subscriptions



  }

  //Applied after the model saved
  updateForm() {
    this.formGroup.patchValue({
      locationName: this.currentModel.name,
      countryName: this.currentModel.countryName,
      locationType: this.currentModel.locationType,
      airportCode: this.currentModel.airportCode,
      address: this.currentModel.address,
      phone: this.currentModel.phone,
      mobilePhone: this.currentModel.mobilePhone,
      latitude: this.currentModel.latitude,
      longitude: this.currentModel.longitude,
      rate: this.currentModel.rate,
      timezone: this.currentModel.timezone,
      rateCode: this.currentModel.rateCode,
      info: this.currentModel.info,
      isShownOnSite: this.currentModel.isShownOnSite
    });
    this.disableFields();
  }

  //Update the model with the form values
  private applyForm() {
    this.currentModel.name = this.formGroup.controls["locationName"].value;
    this.currentModel.countryName = this.formGroup.controls["countryName"].value;
    this.currentModel.locationType = this.formGroup.controls["locationType"].value;
    this.currentModel.airportCode = this.formGroup.controls["airportCode"].value;
    this.currentModel.address = this.formGroup.controls["address"].value;
    this.currentModel.phone = this.formGroup.controls["phone"].value;
    this.currentModel.mobilePhone = this.formGroup.controls["mobilePhone"].value;
    this.currentModel.latitude = this.formGroup.controls["latitude"].value;
    this.currentModel.longitude = this.formGroup.controls["longitude"].value;
    this.currentModel.rate = this.formGroup.controls["rate"].value;
    this.currentModel.timezone = this.formGroup.controls["timezone"].value;
    this.currentModel.rateCode = this.formGroup.controls["rateCode"].value;
    this.currentModel.info = this.formGroup.controls["info"].value;
    this.currentModel.isShownOnSite = this.formGroup.controls["isShownOnSite"].value;
  }

  private disableFields() {
    this.fields.locationName.disable();
    this.fields.countryName.disable();
    this.fields.locationType.disable();
    this.fields.airportCode.disable();
    this.fields.address.disable();
    this.fields.phone.disable();
    this.fields.mobilePhone.disable();
    this.fields.latitude.disable();
    this.fields.longitude.disable();
    this.fields.info.disable();
  }

  //Save the model and update it from the service
  save() {
    this.submitted = true;
    if (this.isValid()) {
      this.applyForm();
      this.isSubmitting = true;
      this.formGroup.disable();
      this.defaultService.saveLocation(this.currentModel).subscribe(res => {
        this.isSubmitting = false;
        this.formGroup.enable();
        this.disableFields();

        this.notificationService.showSuccess("Location was successfully saved");
        this.router.navigateByUrl(`/franchisees/locations/${res.uid}`);
      },
        err => {
          if (err.status === 401) {
            this.notificationService.showError("You are not authorized to perform this action");
            this.router.navigateByUrl("/");
          }
          this.isSubmitting = false;
          this.formGroup.enable();
          this.disableFields();
          throw err;
        }
      );
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
