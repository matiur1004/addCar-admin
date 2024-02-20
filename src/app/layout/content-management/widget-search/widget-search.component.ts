import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FranchiseeListItem } from 'app/shared/models/franchisee-list-item.model';
import { FranchiseeService } from 'app/shared/services/franchisee/franchisee.service';
import { NavigationService } from 'app/shared/services/navigation/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-widget-search',
  templateUrl: './widget-search.component.html',
  styleUrls: ['./widget-search.component.css']
})
export class WidgetSearchComponent implements OnInit {
  private searchTextSubscription: Subscription;
  public franchiseesSource: FranchiseeListItem[] = [];

  selectedFranchisee: FranchiseeListItem;
  franchiseeQueryParam: string;
  
  constructor(
    private route: ActivatedRoute,
    private franchiseeService: FranchiseeService,
    private router: Router,
    private navigationService: NavigationService,
  ) { }

  ngOnInit(): void {
    this.searchTextSubscription = this.route.queryParams.subscribe(values => {
      this.franchiseeQueryParam = values['franchiseeUid'];
    });
    this.franchiseeService.loadWhiteLabelFranchisees().subscribe((res) => {
      this.franchiseesSource = res;
      if (this.franchiseeQueryParam) {
        this.franchiseeQueryParam = this.franchiseeQueryParam;
        this.selectedFranchisee = this.franchiseesSource.filter((item) => this.franchiseeQueryParam.includes(item.uid))[0];
      } else {
        this.selectedFranchisee = this.franchiseesSource[0];
      }
      this.navigationService.setContextVariable("entityName", "Widget");
      this.navigationService.setContextVariable("entityLink", "widgets");
    });
  }
  
  onFranchiseeChange($event) {
    this.navigationService.setContextVariable("entityName", "Widget");
    this.navigationService.setContextVariable("entityLink", "widgets");
    if ($event.value.uid === "00000000-0000-0000-0000-000000000000") {
      this.router.navigate(["/content-management/widgets/page/1"]);
    } else {
      this.router.navigate(["/content-management/widgets/page/1"], {
        queryParams: {
          franchiseeUid: $event.value.uid
        }
      });
    }
  }

  //Unsubscribe from subscriptions here to avoid memory leaks
  ngOnDestroy(): void {
    if (this.searchTextSubscription)
      this.searchTextSubscription.unsubscribe();
  }
}
