// Code behind logic for list of CountryListItem

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";

import { PagerService } from "@app-shared/common/pager.service";
import { ListPageWrapper } from "@app-shared/common/list-page-wrapper.model";
import { NotificationService } from "@app-shared/services/notification.service";
import { SpinnerOverlayService } from "@app-shared/services/spinner-overlay.service";
import { CountryListItem } from '@app-shared/models/franchisee/country-list-item.model';
import { CountryService } from '@app-shared/services/franchisee/country.service';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AutocompleteHelper } from "app/shared/services/autocomplete.helper";
import { MatTableDataSource } from "@angular/material/table";
import { MessageCodes } from "../../../shared/models/system/message-codes";


@Component({
  selector: 'app-country-allowed-countries',
  templateUrl: './country-allowed-countries.component.html',
  styleUrls: ['./country-allowed-countries.component.css']
})

export class CountryAllowedCountriesComponent implements OnInit, OnChanges {


  @Input() countries: CountryListItem[];

  pageWrapper: ListPageWrapper<CountryListItem>;
  s: Array<CountryListItem>;
  pager: any = {};
  submitted = false;
  countriesSource: CountryListItem[];
  displayColumns: string[] = ['name', 'action'];
  dataSource = new MatTableDataSource<CountryListItem>(null);
  public countryHelper: AutocompleteHelper<CountryListItem>;
  public formGroup: FormGroup;
  
  get fields() { return this.formGroup.controls; }

  constructor(private defaultService: CountryService, private formBuilder: FormBuilder, private spinnerService: SpinnerOverlayService,
    private notificationService: NotificationService) {
      this.countryHelper = new AutocompleteHelper<CountryListItem>();
      this.countryHelper.loader = (name) => this.defaultService.findCountries(name);
      this.countryHelper.filter = (term, list) => AutocompleteHelper.countryListFilter(term, list);
      this.countryHelper.formatter = (result) => result.name;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<CountryListItem>(this.countries);
    this.formGroup = this.formBuilder.group({
      country: new FormControl('', [Validators.required]),
    });
    //this.loadLists();  
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  addCountry(){
    console.log(this.formGroup.value.country);
    let country = this.formGroup.value.country;    
    this.defaultService.addAllowedCountries(this.defaultService.countryId, country.uid).subscribe({
      next: () => {
        this.countries.push(country);
        this.dataSource.data = this.countries;
        this.notificationService.showSuccess('Added successfully!');
      },
      error: (error) => {
        if (error.status === MessageCodes.DuplicateAllowedCountryReferenceError) {
          this.notificationService.showWarningMessage(MessageCodes.DuplicateAllowedCountryReferenceError);
        }
        if (error.status === MessageCodes.CurrentAllowedCountryReferenceError) {
          this.notificationService.showWarningMessage(MessageCodes.CurrentAllowedCountryReferenceError);
        }
      }
    }); 
  }

  //Validate the control
  isValid(): boolean {
    const result = this.formGroup.valid;
    if(result) {
      let country = this.formGroup.value.country;
      if(typeof country == 'string') return false;
    }
    return result;
  }

  delete(uid: string, index) {
    this.defaultService.deleteAllowedCountries(uid).subscribe(res => {
      this.countries.splice(index, 1);
      this.notificationService.showSuccess('Deleted successfully!');
    })
    //this.defaultService.delete(uid).subscribe((res) => {
    //  this.notificationService.showSuccess("The  was deleted successfully");
    //  this.reloadList();
    //});
  }


  gotoPage(pageNum: number) {
    this.pager.currentPage = pageNum;
    this.reloadList();
  }

  private reloadList() {
    //if () {
    //  this.s = [];
    //  this.pager = this.pagerService.getPager(0, 0, 5);
    //  return;
    //}
    //this.spinnerService.show();

    let pageNum = (this.pager.currentPage) ? this.pager.currentPage : 0;

    //  this.defaultService.loadAllowedCountries(, this.pager.currentPage).subscribe((: ListPageWrapper<CountryListItem>) => {
    //    this.pageWrapper = ;
    //    this.s = .items;
    //    this.pager = this.pagerService.getPager(.totalCount, .currentPage, .pageSize);
    //  //this.spinnerService.hide();
    //}, (err) => {
    //  //this.spinnerService.hide();
    //  throw err;
    //});
  }

  searchCategory(event: any): void {

  }
}
