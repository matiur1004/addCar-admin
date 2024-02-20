import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationVehiclesViewModel } from 'app/shared/models/location/location-vehicles-view-model.model';
import { LocationService } from 'app/shared/services/location/location.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-location-vehicle-list',
  templateUrl: './location-vehicle-list.component.html',
  styleUrls: ['./location-vehicle-list.component.css']
})
export class LocationVehicleListComponent implements OnInit {
  private routeDataSubscription: Subscription;
  
  currentModel: LocationVehiclesViewModel
  constructor(private locationService: LocationService, private route: ActivatedRoute, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.routeDataSubscription = this.route.data.subscribe((data) => {
      this.currentModel = data.datas;
    });
  }

  onSelectCategory(category: any, index) {
    if(!this.currentModel.categories[index]['isSelected'])
      this.currentModel.categories[index]['isSelected'] = true;
    else this.currentModel.categories[index]['isSelected'] = false;
  }

  onChangeSelection(event: any, category: any, vehicle: any) {
    category.vehicles = category.vehicles.map((item) => {
      item.isSelected = false;
      return item;
    })
    if(event.target.checked) {
      vehicle.isSelected = true;
      this.locationService.setLocationCategoryVehicle(this.currentModel.uid, category.uid, vehicle.uid)
        .subscribe(() => {
          this.notificationService.showSuccess('Added successfully!');
        });
    } else {
      this.locationService.unsetLocationCategoryVehicle(this.currentModel.uid, category.uid, vehicle.uid)
        .subscribe(() => {
          this.notificationService.showSuccess('Unset successfully!');
        });
      
    }
    
  }
}
