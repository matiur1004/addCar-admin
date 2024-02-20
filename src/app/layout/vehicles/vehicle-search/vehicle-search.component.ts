import { Component,OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import {VehicleCategoryService} from "@app-shared/services/vehicle/vehicle-category.service";
import {VehicleCategoryListItem} from "@app-shared/models/vehicle/vehicle-category-list-item.model";
import {FormControl} from "@angular/forms";
import {VehicleService} from "@app-shared/services/vehicle/vehicle.service";

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.css']
})
export class VehicleSearchComponent implements OnInit, OnDestroy{

  private searchTextSubscription: Subscription;
  public categoriesSource: VehicleCategoryListItem[] = [];

  get canSearch(): boolean {
    return this.searchText && this.searchText.length > 2 ||
      this.selectCategories && this.selectCategories.length > 0;
  }

  private get canClear(): boolean {
    return (!this.searchText || this.searchText.length === 0) &&
      (!this.selectCategories || this.selectCategories.length === 0);
  }

  searchText: string;
  selectCategories: VehicleCategoryListItem[] = [];
  categoriesQueryParam: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleCategoryService: VehicleCategoryService,
    private vs: VehicleService
  ) {
  }

  ngOnInit(): void {
    this.searchTextSubscription = this.route.queryParams.subscribe(values => {
      this.searchText = values['searchText'];
      this.categoriesQueryParam = values['categories'];
    });
    this.loadLists();
  }

  loadLists(): void {
    this.vehicleCategoryService.loadVehicleCategories(null).subscribe((res) => {
      this.categoriesSource = res;
      if (this.categoriesQueryParam) {
        this.categoriesQueryParam = this.categoriesQueryParam.toLowerCase();
        this.selectCategories = this.categoriesSource.filter((item) => this.categoriesQueryParam.includes(item.code.toLowerCase()))
      }
    });
  }

  performSearch() {
    if (this.canSearch) {
      this.router.navigate(["/vehicles/page/1"], {
        queryParams: {
          searchText: this.searchText ? this.searchText : "",
          categories: this.selectCategories.map(c => c.code).join(",")
        }
      });
    }
    if (this.canClear) {
      this.router.navigate(["/vehicles/page/1"]);
    }
  }

  //Unsubscribe from subscriptions here to avoid memory leaks
  ngOnDestroy(): void {
    if (this.searchTextSubscription)
      this.searchTextSubscription.unsubscribe();
  }

  searchCategory(event: any): void {
    const query = event.target.value;
    if (query) {
      this.categoriesSource = this.categoriesSource.filter((item) => item.code.toLowerCase().includes(query));
    } else {
      this.loadLists();
    }
  }
  clearSearchText() {
    this.searchText = '';
    this.performSearch();

  }
  onKeydown(event) {
    if (event.key === "Enter") {
      this.performSearch();
    }
  }

}
