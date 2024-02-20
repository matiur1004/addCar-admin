// Code behind logic for VehicleDetailsComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, ErrorHandler, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '@app-shared/services/notification.service';
import { VehicleViewModel } from '@app-shared/models/vehicle/vehicle-view-model.model';
import { VehicleService } from '@app-shared/services/vehicle/vehicle.service';
import { ClientControlValidators } from '@app-shared/common/client-control-validators';
import { FuelTypes, GearTypes } from '@app-shared/models/enums';
import { VehicleCategoryListItem } from '../../../shared/models/vehicle/vehicle-category-list-item.model';
import { VehicleCategoryService } from '../../../shared/services/vehicle/vehicle-category.service';
import { GlobalService } from '@app-shared/services/global.service';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';
import { VehicleImageService } from '../../../shared/services/vehicle/vehicle-image.service';

@Component({
  templateUrl: './vehicle-details.component.html',
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public gearTypes = GearTypes;
  public fuelTypes = FuelTypes;
  public categoriesSource: VehicleCategoryListItem[] = [];

  private routeDataSubscription: Subscription; //Used for the current model retrieval from the resolver
  currentModel: VehicleViewModel;
  submitted = false;
  isSubmitting = false;
  isCategoriesLoading = false;
  selectedValue: string[] = [];
  categoriesFormControl: FormControl = new FormControl('', [Validators.required]);

  // convenience getter for easy access to form fields
  get fields() {
    return this.formGroup.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private defaultService: VehicleService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly globalService: GlobalService,
    private notificationService: NotificationService,
    private vehicleCategoryService: VehicleCategoryService,
    private navigationService: NavigationService,
    private readonly vs: VehicleImageService,
    private errorHandler: ErrorHandler,
  ) { }

  ngOnInit() {
    this.createForm();
    this.routeDataSubscription = this.route.data.subscribe(
      (data: { vehicle: VehicleViewModel }) => {
        this.currentModel = data.vehicle;
        if(data.vehicle.categories) this.selectedValue = data.vehicle.categories.map((cat) => cat.code);
        this.categoriesFormControl.setValue(this.selectedValue);

        this.route.params.subscribe((x) => {
          if (x.uid === 'new') {
            this.navigationService.setContextVariable("isNewVehicle", "true");
          } else {
            this.vs.getVehicleCount(this.currentModel.uid).subscribe((res) => {
              this.navigationService.setContextVariable("vehicleImageCount", res);
            });
          }
        });
        if (this.currentModel) this.updateForm();
      },
    );
    this.loadLists();
  }

  private loadLists() {
    //Categories
    this.isCategoriesLoading = true;
    if (this.fields) this.fields.categories.disable();
    this.vehicleCategoryService.loadVehicleCategories(null).subscribe((res) => {
      this.categoriesSource = res;
      this.isCategoriesLoading = false;
      if (this.fields) this.fields.categories.enable();
    });
    //End of Categories
  }

  //Applied to a new form
  //Requires unsubscribe
  createForm() {

    this.formGroup = this.formBuilder.group({
      modelName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(100)])),
      gears: new FormControl(null),
      passengers: new FormControl(2),
      doors: new FormControl(2),
      isCdPlayer: new FormControl(false),
      isAirCondition: new FormControl(false),
      isGps: new FormControl(false),
      isUsb: new FormControl(false),
      baggage: new FormControl(2),
      engine: new FormControl(0.1, Validators.compose([ClientControlValidators.isValidFloatNumber, Validators.min(0.1), Validators.max(20)])),
      fuel: new FormControl(null),
      categories: new FormControl(),
    });

    //Change event subscriptions
  }

  //Applied after the model saved
  updateForm() {
    this.formGroup.patchValue({
      modelName: this.currentModel.modelName,
      gears: this.currentModel.gears,
      passengers: this.currentModel.passengers,
      doors: this.currentModel.doors,
      isCdPlayer: this.currentModel.isCdPlayer,
      isAirCondition: this.currentModel.isAirCondition,
      isGps: this.currentModel.isGps,
      isUsb: this.currentModel.isUsb,
      baggage: this.currentModel.baggage,
      engine: this.currentModel.engine,
      fuel: this.currentModel.fuel,
      categories: this.currentModel.categories,
    });
  }

  //Update the model with the form values
  private applyForm() {
    this.currentModel.modelName = this.formGroup.controls['modelName'].value;
    this.currentModel.gears = this.formGroup.controls['gears'].value;
    this.currentModel.passengers = this.formGroup.controls['passengers'].value;
    this.currentModel.doors = this.formGroup.controls['doors'].value;
    this.currentModel.isCdPlayer = this.formGroup.controls['isCdPlayer'].value;
    this.currentModel.isAirCondition = this.formGroup.controls['isAirCondition'].value;
    this.currentModel.isGps = this.formGroup.controls['isGps'].value;
    this.currentModel.isUsb = this.formGroup.controls['isUsb'].value;
    this.currentModel.baggage = this.formGroup.controls['baggage'].value;
    this.currentModel.engine = this.formGroup.controls['engine'].value;
    this.currentModel.fuel = this.formGroup.controls['fuel'].value;
    this.currentModel.categories = this.findCategories(this.categoriesFormControl.value);
  }

  //Save the model and update it from the service
  save() {
    this.submitted = true;
    if (this.isValid()) {
      this.applyForm();
      this.isSubmitting = true;
      this.formGroup.disable();
      this.defaultService.saveVehicle(this.currentModel).subscribe(
        (res) => {
          this.isSubmitting = false;
          this.formGroup.enable();
          this.notificationService.showSuccess('VehicleViewModel was successfully saved');
          //this.currentModel = res;
          //this.updateForm();
          this.router.navigateByUrl(`/vehicles/${res.uid}`);
        },
        (err) => {
          if (err.status === 401) {
            /*
            const dialogRef = this.dialog.open(ErrorDialogComponent, {
              data: {
                title: "Operation error",
                content: "You are not authorized to perform this action."
              }
            });

            dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl("home"));*/
            this.notificationService.showError('You are not authorized to perform this action');
            this.router.navigateByUrl('/');
          }
          this.isSubmitting = false;
          this.formGroup.enable();
          throw err;
        },
      );
    }
  }

  //Validate the control
  isValid(): boolean {
    const result = this.formGroup.valid && this.categoriesFormControl.valid;
    return result;
  }

  //Unsubscribe from subscriptions here
  ngOnDestroy() {
    if (this.routeDataSubscription) this.routeDataSubscription.unsubscribe();
  }

  searchCategory(event: any): void {
    const query = event.target.value;
    if (query) {
      this.categoriesSource = this.categoriesSource.filter((item) => {
        item.code.toLowerCase().includes(query);
      });
    } else {
      this.loadLists();
    }
  }

  findCategories(categories: string[]): any[] {
    const cats = [];
    for (const cat of categories) {
      this.categoriesSource.filter((item) => {
        if (item.code == cat) {
          cats.push(item);
        }
      });
    }
    return cats;
  }
}
