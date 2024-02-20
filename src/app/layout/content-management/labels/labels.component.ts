import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ListPageWrapper } from 'app/shared/common/list-page-wrapper.model';
import { PagerService } from 'app/shared/common/pager.service';
import { LabelTranslationListItem } from 'app/shared/models/localization/label-translation-list-item.model';
import { LanguageListItem } from 'app/shared/models/localization/language-list-item.model';
import { LabelViewModel } from 'app/shared/models/page-management/label-view-model.model';
import { MessageCodes } from 'app/shared/models/system/message-codes';
import { ListSettingsService } from 'app/shared/services/list-settings.service';
import { LabelService } from 'app/shared/services/localization/label.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { SpinnerOverlayService } from 'app/shared/services/spinner-overlay.service';
import { EMPTY, of, Subscription } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';
import { GridDecoratorLabels } from './grid-decorators/grid-decorator-labels';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css'],

})
export class LabelsComponent implements OnInit {


  page = "1";
  pageWrapper: ListPageWrapper<LabelTranslationListItem>;
  pages: Array<LabelTranslationListItem>;
  pager: any = {};
  
  labelGridDecorator = new GridDecoratorLabels();
  newLabelRowPrototype = new LabelViewModel();

  public codeCount: number = 0;


  selectedLanguage: LanguageListItem;
  private searchTextSubscription: Subscription;

  get canSearch(): boolean {
    return this.searchText && this.searchText.length > 2;
  }

  private get canClear(): boolean {
    return (!this.searchText || this.searchText.length === 0);
  }
  private _subscription: Subscription = new Subscription();

  searchText: string;
  translationLabels: LabelTranslationListItem[] = [];
  constructor(private route: ActivatedRoute, 
            private router: Router,
            private navigationService: NavigationService, 
            private listSettings: ListSettingsService, 
            private spinnerService: SpinnerOverlayService,
            private defaultService: LabelService,
            private pagerService: PagerService,
            private notificationService: NotificationService,) { }

  ngOnInit(): void {
    this.codeCount = this.defaultService.getCount();

    this.searchTextSubscription = this.route.queryParams.subscribe(values => {
      this.searchText = values['searchText'];
      this.defaultService.getLabels(this.searchText, null, +this.page).subscribe((res) => {
        this.pageWrapper = res;
        this.pages = res.items;
        this.pager = this.pagerService.getPager(res.totalCount, res.currentPage, res.pageSize);
      });
    });
  
    const settings = this.listSettings.get(`/content-management/labels`);
    this.route.params.subscribe(params => {
      if (params['pageNum']) {      
        this.page = params['pageNum'];
        if(this.selectedLanguage) {
          this.onLanguageChange(this.selectedLanguage);
        }
        this.listSettings.set(`/content-management/labels`, { page: this.page });
      } else if (settings && settings.page) {
        this.router.navigate([`/content-management/labels/page/${settings.page}`])
        return;
      }
    })
    

    this.navigationService.setContextVariable("entityName", "Translation");
    this.navigationService.setContextVariable("entityLink", "labels");

    this._subscription = this.defaultService.selectCountStatus$.subscribe(status => {
      if (status == false) {
        this.defaultService.statusTrue();
        this.ngOnInit();
      }
    });
   
    
  }

  receivedMessageHandler(temp) {
    this.codeCount = temp;
  }
  clearArray() {
    this.defaultService.clearSelectItems();
   
  }
  onLanguageChange(languageValue: LanguageListItem) {
    if(languageValue) {
      this.selectedLanguage = languageValue;
      this.spinnerService.show();
      this.defaultService.getLabels(this.searchText, languageValue.uid, +this.page).pipe(catchError(error => {
          this.spinnerService.hide();
          return EMPTY;
        }), mergeMap(something => {
          this.spinnerService.hide();
          if (something) {
            return of(something);
          } else {
            return EMPTY;
          }
        })
      ).subscribe((data)=> {
        this.pageWrapper = data;
        this.pages = data.items;
       
        this.pager = this.pagerService.getPager(data.totalCount, data.currentPage, data.pageSize);
      })
    }
  }
  performSearch() {
    if (this.canSearch) {
      this.router.navigate(["/content-management/labels/page/1"], {
        queryParams: {
          searchText: this.searchText ? this.searchText : "",
        }
      });

    }
    if (this.canClear) {
      this.router.navigate(["/content-management/labels/page/", this.pageWrapper.currentPage]);
    }
  }
  clearSearchText() {
    this.searchText = "";
    this.performSearch();
  }
  //Unsubscribe from subscriptions here to avoid memory leaks
 


  onKeydown(event) {
    if (event.key === "Enter") {
      this.performSearch();
    }
  }
  gridDataSaveHandler(params) {
    if (params.type === "cellValueChanged" && params.data.code) {
      this.defaultService.saveLabel(params.data, this.selectedLanguage.uid).subscribe(() => {
        this.notificationService.showSuccessMessage(MessageCodes.LabelListSaveSuccess);
      }, error => {
        this.notificationService.showErrorMessage(MessageCodes.LabeListUpdateError);
      })
    }
  }
  ngOnDestroy(): void {
    if (this.searchTextSubscription)
      this.searchTextSubscription.unsubscribe();
    this._subscription.unsubscribe();
  }
}
