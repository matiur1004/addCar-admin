// Code behind logic for PageDetailsComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, OnInit, ErrorHandler, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '@app-shared/services/notification.service';
import { Converters } from '@app-shared/common/converters';
import { PageViewModel } from '@app-shared/models/page-management/page-view-model.model';
import { PageService } from '@app-shared/services/page-management/page.service';
import { TextEntryViewModel } from '../../../shared/models/localization/text-entry-view-model.model';
import { GridDecoratorMetatags } from '../grid/grid-decorators/grid-decorator-metatags';
import { MetaTagViewModel } from '../../../shared/models/page-management/meta-tag-view-model.model';
import { MessageCodes } from '../../../shared/models/system/message-codes';
import { ContentEditorComponent } from '../../../shared/components/content-editor/content-editor.component';
import { CountryPageUrlService } from '../../../shared/services/page-management/country-page-url.service';
import { CountryPageTypes, PageTypes } from '../../../shared/models/enums';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';
import { TranslationRequestViewModel } from '../../../shared/models/localization/translation-request-view-model.model';
import { TranslateService } from '../../../shared/services/localization/translate.service';
import { LanguageListItem } from 'app/shared/models/localization/language-list-item.model';

@Component({
  templateUrl: './page-details.component.html'
})

export class PageDetailsComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;

  metatagGridDecorator = new GridDecoratorMetatags();
  newMetatagRowPrototype = new MetaTagViewModel();
  selectedItem = new MetaTagViewModel();

  public currentMetaTags: MetaTagViewModel[] = [];

  @ViewChild('contentEditor')
  public contentEditor: ContentEditorComponent;

  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver
  currentModel: PageViewModel;
  submitted = false;
  isSubmitting = false;

  private maxContentSize = 2500000;
  private currentLanguage: string = null;

  public currentText: TextEntryViewModel;

  public needsDarkEditorTheme = false;

  // convenience getter for easy access to form fields
  get fields() { return this.formGroup.controls; }

  constructor(private formBuilder: FormBuilder,
    private defaultService: PageService,
    private countryPageUrlService: CountryPageUrlService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private navigationService: NavigationService,
    private translateService: TranslateService,
    private errorHandler: ErrorHandler) {
  }

  ngOnInit() {
    this.navigationService.setContextVariable("entityName", "Page");
    this.navigationService.setContextVariable("entityLink", "pages");
    this.routeDataSubscription = this.route.data.subscribe((data: { page: PageViewModel }) => {
      this.currentModel = data.page;
      this.needsDarkEditorTheme = this.isPageTypeForDarkTheme(data.page.pageType) || data.page.isCountrySpecific && data.page.countryPageType === CountryPageTypes.LocationContent;

      if (this.currentModel)
        this.createForm();
    });
    this.loadLists();
  }

  private loadLists() {

  }

  private isPageTypeForDarkTheme(pageType: PageTypes) {
    const darkThemePageTypes = [PageTypes.About, PageTypes.HomePage];
    return darkThemePageTypes.find(a => a == pageType) > 0;
  }

  //Applied to a new form
  //Requires unsubscribe
  createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      name: new FormControl(this.currentModel.name, Validators.required),
      url: new FormControl(this.currentModel.url, Validators.required),
      title: new FormControl(),
    });

    //Change event subscriptions


    this.currentMetaTags = [...this.currentModel.metaTags];

    if (this.currentModel.isCountrySpecific)
      this.fields.name.disable();
    this.fields.url.disable();
  }

  onLanguageChange(languageValue: LanguageListItem) {
    if (languageValue) {
      this.fields.title.enable();
      this.applyForm();
      this.fields.title.setValue(this.getLocalizedTitle(languageValue.uid));
      this.getLocalizedMetatags(languageValue.uid);
      this.currentText = this.getLocalizedText(languageValue.uid);
    }
    else {
      this.fields.title.disable();
    }
    this.currentLanguage = languageValue.uid;
  }

  onTranslationsRequested(request: TranslationRequestViewModel) {
    if (this.isValid()) {
      this.applyForm();
      request.content = this.currentText.content;
      this.translateService.translate(request).subscribe(res => {
        res.forEach(a => {
          this.getLocalizedText(a.languageUid).content = a.content;
        });
        this.notificationService.showSuccess("Translated successfully");
      });
    }
  }

  onDuplicationsRequested(request: TranslationRequestViewModel) {
    if (this.isValid()) {
      this.applyForm();
      request.destinationLanguageUids.forEach(a => {
        this.getLocalizedText(a).content = this.currentText.content;
      });
      this.notificationService.showSuccess("Duplicated successfully");
    }
  }

  //Applied after the model saved
  updateForm() {
    this.formGroup.patchValue({
      name: this.currentModel.name,
      url: this.currentModel.url,
    });
  }

  //Update the model with the form values
  private applyForm() {
    this.currentModel.name = this.formGroup.controls["name"].value;
    this.currentModel.url = this.formGroup.controls["url"].value;
    this.setLocalizedTitle(this.formGroup.controls["title"].value);
    this.contentEditor.save();
    this.saveLocalizedMetatags();
    this.currentModel.metaTags = [...this.currentMetaTags];
    this.currentModel.localizedTitles = this.cleanUpLocalizedContent(this.currentModel.localizedTitles);
    this.currentModel.metaTags.forEach(a => {
      a.localizedContent = this.cleanUpLocalizedContent(a.localizedContent);
    });
    this.setTitleNames();
    this.setMetatagContentNames();
    this.setTextNames();
  }

  gridDataSaveHandler(params) {
    //if (params.type === "cellValueChanged" && params.colDef.field === "name") {
    //  let nameTransformer = this.generationResultNameTransformers.find(a => a.data === params.data);
    //  if (!nameTransformer) {
    //    nameTransformer = new GenerationResultNameTransformer(params.data, "");
    //    this.generationResultNameTransformers.push(nameTransformer);
    //  }
    //  nameTransformer.transform(params.data.name);
    //  params.node.setData(params.data);
    //}
    //localStorage.setItem("GeneratorToolComponent_generationResults", JSON.stringify(this.currentModel.generationResults));
  }

  private saveLocalizedMetatags() {
    this.currentMetaTags.forEach(a => {
      if (!a.localizedContent)
        a.localizedContent = [];
      let text = a.localizedContent.find(a => a.languageUID === this.currentLanguage);
      if (!text) {
        text = new TextEntryViewModel(this.currentLanguage);
        a.localizedContent.push(text);
      }
      text.content = a.content;
    });
  }

  private getLocalizedMetatags(languageValue: string) {
    this.currentMetaTags.forEach(a => {
      if (!a.localizedContent)
        a.localizedContent = [];
      const text = a.localizedContent.find(a => a.languageUID === languageValue);
      a.content = text?.content;
    });
    this.currentMetaTags = [...this.currentMetaTags];
  }

  private getLocalizedText(languageValue: string): TextEntryViewModel {
    const title = this.currentModel.localizedTexts.find(a => a.languageUID === languageValue);
    if (title)
      return title;
    const entry = new TextEntryViewModel(languageValue);
    this.currentModel.localizedTexts.push(entry);
    return entry;
  }

  private getLocalizedTitle(languageValue: string): string {
    const title = this.currentModel.localizedTitles.find(a => a.languageUID === languageValue);
    if (title)
      return title.content;
    return null;
  }

  private setLocalizedTitle(value: string) {
    let title = this.currentModel.localizedTitles.find(a => a.languageUID === this.currentLanguage);
    if (title) {
      title.content = value;
    } else {
      title = new TextEntryViewModel(this.currentLanguage);
      title.content = value;
      this.currentModel.localizedTitles.push(title);
    }
  }

  private cleanUpLocalizedContent(values: TextEntryViewModel[]): TextEntryViewModel[] {
    if (!values)
      return values;
    return values.filter(a => a.languageUID);
  }

  private setTitleNames() {
    this.currentModel.localizedTitles.forEach(a => {
      a.name = `Title for page '${this.currentModel.name}'`;
    });
  }

  private setTextNames() {
    this.currentModel.localizedTexts.forEach(a => {
      a.name = `Text for page '${this.currentModel.name}'`;
    });
  }

  private setMetatagContentNames() {
    this.currentModel.metaTags.forEach(b => {
      b.localizedContent.forEach(a => {
        a.name = `Title for page '${this.currentModel.name}' metatag '${b.name ? b.name : b.httpEquiv}'`;
      })
    });
  }

  //Save the model and update it from the service
  save(isDraft: boolean) {
    this.submitted = true;
    this.contentEditor.save();
    if (this.isValid()) {
      this.applyForm();
      this.currentModel.isDraft = isDraft;
      this.isSubmitting = true;
      this.formGroup.disable();
      this.defaultService.savePage(this.currentModel).subscribe(res => {
        this.isSubmitting = false;
        this.formGroup.enable();
        this.notificationService.showSuccess(isDraft ? "Page was successfully saved as draft" : "Page was successfully saved");
        if (this.currentModel.isCountrySpecific) {
          const url = this.countryPageUrlService.getPageDetailsUrl(this.currentModel.countryPageType, this.currentModel.countryUid);
          this.router.navigateByUrl(url);
        } else {
          this.router.navigateByUrl(`/content-management/pages/${res.uid}`);
        }
      },
        err => {
          if (err.status === 401) {
            this.notificationService.showErrorMessage(MessageCodes.NotAuthorizedError);
            this.router.navigateByUrl("/");
          }
          this.isSubmitting = false;
          this.formGroup.enable();
          throw err;
        }
      );
    }
  }

  //Validate the control
  isValid(): boolean {
    let result = this.formGroup.valid;
    if (result) {
      const BreakException = {};
      try {
        this.currentModel.localizedTexts.forEach(a => {
          if (a.content && a.content.length > this.maxContentSize) {
            result = false;
            this.notificationService.showErrorMessage(MessageCodes.ContentTooLargeError);
            this.fields.language.setValue(a.languageUID);
            throw BreakException;
          }
        });
      }
      catch (e) {
        if (e !== BreakException) throw e;
      }
    }
    return result;
  }

  //Unsubscribe from subscriptions here
  ngOnDestroy() {
    if (this.routeDataSubscription)
      this.routeDataSubscription.unsubscribe();

  }
}
