import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FranchiseeListItem } from '../../../shared/models/franchisee-list-item.model';
import { FranchiseeService } from '../../../shared/services/franchisee/franchisee.service';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.css']
})
export class PageSearchComponent implements OnInit, OnDestroy {

  private searchTextSubscription: Subscription;
  public franchiseesSource: FranchiseeListItem[] = [];

  selectedFranchisee: FranchiseeListItem;
  franchiseeQueryParam: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private franchiseeService: FranchiseeService,
    private navigationService: NavigationService,
  ) {
  }

  ngOnInit(): void {
    this.searchTextSubscription = this.route.queryParams.subscribe(values => {
      this.franchiseeQueryParam = values['franchiseeUid'];
    });
    this.loadLists();


  }

  loadLists(): void {
    this.franchiseeService.loadWhiteLabelFranchisees().subscribe((res) => {
      this.franchiseesSource = res;
      if (this.franchiseeQueryParam) {
        this.franchiseeQueryParam = this.franchiseeQueryParam;
        this.selectedFranchisee = this.franchiseesSource.filter((item) => this.franchiseeQueryParam.includes(item.uid))[0];
      } else {
        this.selectedFranchisee = this.franchiseesSource[0];
      }
      this.navigationService.setContextVariable("entityName", "Page");
      this.navigationService.setContextVariable("entityLink", "pages");

    });
  }

  onFranchiseeChange($event) {
    if ($event.value.uid === "00000000-0000-0000-0000-000000000000") {
      this.router.navigate(["/content-management/pages/page/1"]);
    } else {
      this.router.navigate(["/content-management/pages/page/1"], {
        queryParams: {
          franchiseeUid: $event.value.uid
        }
      });
    }
    this.navigationService.setContextVariable("entityName", "Page");
    this.navigationService.setContextVariable("entityLink", "pages");

  }

  //Unsubscribe from subscriptions here to avoid memory leaks
  ngOnDestroy(): void {
    if (this.searchTextSubscription)
      this.searchTextSubscription.unsubscribe();
  }
}
