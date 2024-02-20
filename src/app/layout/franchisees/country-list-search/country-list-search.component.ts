import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-country-list-search',
  templateUrl: './country-list-search.component.html',
  styleUrls: ['./country-list-search.component.css'],
})
export class CountryListSearchComponent implements OnInit {
  @Input() isSelectVisible: boolean = true; // changed this value to check frontend display
  @Input() optionsValues: Array<any> = [];
  @Input() placeholder = 'Search country by name';
  @Input() routeParams = '/franchisees/countries/page/1';

  private searchTextSubscription: Subscription;

  get canSearch(): boolean {
    return this.searchText && this.searchText.length > 2;
  }

  private get canClear(): boolean {
    return !this.searchText || this.searchText.length === 0;
  }

  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.searchTextSubscription = this.route.queryParams.subscribe((values) => {
      this.searchText = values['searchText'];
    });
  }

  performSearch(): void {
    if (this.canSearch) {
      this.router.navigate([this.routeParams], {
        queryParams: { searchText: this.searchText },
      });
    }
    if (this.canClear) {
      this.router.navigate([this.routeParams]);
    }
  }

  //Unsubscribe from subscriptions here to avoid memory leaks
  ngOnDestroy(): void {
    if (this.searchTextSubscription)
      this.searchTextSubscription.unsubscribe();
  }

}
