import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit, OnDestroy {

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
    this.searchTextSubscription = this.route.queryParams.subscribe(values => {
      this.searchText = values['searchText'];
    });
  }

  performSearch() {
    if (this.canSearch) {
      this.router.navigate(["/users/page/1"], { queryParams: { searchText: this.searchText } });
    }
    if (this.canClear) {
      this.router.navigate(["/users/page/1"]);
    }
  }

  //Unsubscribe from subscriptions here to avoid memory leaks
  ngOnDestroy(): void {
    if (this.searchTextSubscription)
      this.searchTextSubscription.unsubscribe();
  }

}
