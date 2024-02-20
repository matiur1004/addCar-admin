import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, empty, of, Subscription } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ListPageWrapper } from '../../shared/common/list-page-wrapper.model';
import { PagerService } from '../../shared/common/pager.service';
import { LabelTranslationListItem } from '../../shared/models/localization/label-translation-list-item.model';
import { LanguageListItem } from '../../shared/models/localization/language-list-item.model';
import { LabelViewModel } from '../../shared/models/page-management/label-view-model.model';
import { MessageCodes } from '../../shared/models/system/message-codes';
import { LanguageService } from '../../shared/services/code-book/language.service';
import { ListSettingsService } from '../../shared/services/list-settings.service';
import { InterpreterViewLabelsService } from '../../shared/services/localization/interpreter-view-labels.service';
import { LabelService } from '../../shared/services/localization/label.service';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { NotificationService } from '../../shared/services/notification.service';
import { SpinnerOverlayService } from '../../shared/services/spinner-overlay.service';
import { GridDecoratorInterpreterLabels } from '../grid-decorators-interpreter/grid-decorator-interpreter-labels';

@Component({
  selector: 'app-interpreter-view-labels',
  templateUrl: './interpreter-view-labels.component.html',
  styleUrls: ['./interpreter-view-labels.component.css']
})
export class InterpreterViewLabelsComponent implements OnInit {


  page = "1";
  pageWrapper: ListPageWrapper<LabelTranslationListItem>;
  pages: Array<LabelTranslationListItem>;
  pager: any = {};
  selectedLanguage: LanguageListItem;
  private searchTextSubscription: Subscription;
  searchText: string;


  labelGridDecorator = new GridDecoratorInterpreterLabels();

  newLabelRowPrototype = new LabelViewModel();
  constructor(private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService,
    private listSettings: ListSettingsService,
    private spinnerService: SpinnerOverlayService,
    private defaultService: InterpreterViewLabelsService,
    private pagerService: PagerService,
    private notificationService: NotificationService,
    private languageService: LanguageService,
  ) { }
  linkUid = 'ba1444ef-36fb-4506-8a9b-f509965ab1e4';
  ngOnInit(): void {

     this.searchTextSubscription = this.route.queryParams.subscribe(values => {
       this.searchText = values['searchText'];
  });
    const settings = this.listSettings.get(`/interpreter-view`);
    this.route.params.subscribe(params => {
      if (params['pageNum']) {
        this.page = params['pageNum'];
        this.linkUid = params['uid'];
        this.listSettings.set(`/interpreter-view`, { page: this.page });
      } else if (settings && settings.page) {
        this.router.navigate([`/interpreter-view/${this.linkUid}/page/${settings.page}`,])
        return;
      }
      this.defaultService.getInterpreterLabels(this.searchText, 'ba1444ef-36fb-4506-8a9b-f509965ab1e4', +this.page).subscribe((res) => {
        this.pageWrapper = res;
        this.pages = res.items;
        this.pager = this.pagerService.getPager(res.totalCount, res.currentPage, res.pageSize);
      });

    })

     this.navigationService.setContextVariable("entityName", "Translation");
     this.navigationService.setContextVariable("entityLink", "labels");

      this.defaultService.getInterpreterLabels(this.searchText, 'ba1444ef-36fb-4506-8a9b-f509965ab1e4', +this.page).subscribe((res) => {
        this.pageWrapper = res;
        this.pages = res.items;
        this.pager = this.pagerService.getPager(res.totalCount, res.currentPage, res.pageSize);
      });
  
  
  }

  gridDataSaveHandler(params) {
    if (params.type === "cellValueChanged" && params.data.code) {
      this.defaultService.saveInterpreterLabel(params.data, 'ba1444ef-36fb-4506-8a9b-f509965ab1e4').subscribe(() => {
        this.notificationService.showSuccessMessage(MessageCodes.LabelListSaveSuccess);
      }, error => {
        this.notificationService.showErrorMessage(MessageCodes.LabeListUpdateError);
      })
    }
  }
  ngOnDestroy(): void {
    if (this.searchTextSubscription)
      this.searchTextSubscription.unsubscribe();
  }
}
