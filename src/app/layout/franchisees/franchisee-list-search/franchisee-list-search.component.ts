import { Component, OnInit, Input } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-franchisee-list-search',
  templateUrl: './franchisee-list-search.component.html',
  styleUrls: ['./franchisee-list-search.component.css'],
})
export class FranchiseeListSearchComponent implements OnInit {
  @Input() isSelectVisible: boolean = true; // changed this value to check frontend display
  @Input() optionsValues: Array<any> = [];
  @Input() placeholder = 'Search franchisee by name';
  @Input() routeParams = '/franchisees/page/1';
  @Input() disabledField = false;

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
  clearSearchText() {
    this.searchText = '';

    this.performSearch();
  }
  //Unsubscribe from subscriptions here to avoid memory leaks
  ngOnDestroy(): void {
    if (this.searchTextSubscription)
      this.searchTextSubscription.unsubscribe();
  }

}
