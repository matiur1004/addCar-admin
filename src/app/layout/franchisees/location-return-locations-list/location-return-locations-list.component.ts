import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationListItem } from '@app-shared/models/franchisee/location-list-item.model';
import { LocationViewModel } from '../../../shared/models/location/location-view-model.model';
import { LocationService } from '../../../shared/services/location/location.service';

@Component({
  selector: 'app-location-return-locations-list',
  templateUrl: './location-return-locations-list.component.html',
  styleUrls: ['./location-return-locations-list.component.css']
})
export class LocationReturnLocationsListComponent implements OnInit {
  private locationUid: any;
  public locationName: string;

  public returnlocations: LocationListItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private readonly defaultService: LocationService,
  ) {

  }

  ngOnInit(): void {
    this.locationUid = this.route.snapshot.params["uid"];
    if (this.locationUid)
      this.loadreturnLocations();
  }
  loadreturnLocations() {
    this.defaultService.loadReturnLocations(this.locationUid).subscribe(items => {
      this.returnlocations = items;
      ;
    });
    this.defaultService.getLocation(this.locationUid).subscribe(res => {
      this.locationName = res.name;
      ;
    });
  }
}
