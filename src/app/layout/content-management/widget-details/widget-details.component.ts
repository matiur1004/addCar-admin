import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentEditorComponent } from 'app/shared/components/content-editor/content-editor.component';
import { UserRoles } from 'app/shared/models/enums';
import { LanguageListItem } from 'app/shared/models/localization/language-list-item.model';
import { TextEntryViewModel } from 'app/shared/models/localization/text-entry-view-model.model';
import { TranslationRequestViewModel } from 'app/shared/models/localization/translation-request-view-model.model';
import { MessageCodes } from 'app/shared/models/system/message-codes';
import { WidgetViewModel } from 'app/shared/models/widget/widget-view.model';
import { AuthService } from 'app/shared/services/auth.new.service';
import { TranslateService } from 'app/shared/services/localization/translate.service';
import { NavigationService } from 'app/shared/services/navigation/navigation.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { WidgetService } from 'app/shared/services/widget/widget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-widget-details',
  templateUrl: './widget-details.component.html',
  styleUrls: ['./widget-details.component.css']
})
export class WidgetDetailsComponent implements OnInit {

  public formGroup: FormGroup;
  
  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver
  currentModel: WidgetViewModel;
  submitted = false;
  isSubmitting = false;
  
  public currentText: TextEntryViewModel;

  @ViewChild('contentEditor')
  public contentEditor: ContentEditorComponent;
  
  private currentLanguage: string = null;
  public needsDarkEditorTheme = false;
  constructor(
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private router: Router,
    private defaultService: WidgetService,
    private authService: AuthService
  ) { }

  get fields() { return this.formGroup.controls; }
  
  ngOnInit(): void {
    this.navigationService.setContextVariable("entityName", "Widget");
    this.navigationService.setContextVariable("entityLink", "widgets");

    this.routeDataSubscription = this.route.data.subscribe((data: { page: WidgetViewModel }) => {
      this.currentModel = data.page;

      if (this.currentModel)
        this.createForm();
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: new FormControl(this.currentModel.name, Validators.required),
      notes: new FormControl(this.currentModel.notes)
    });
    if(!this.authService.isUserInRole(UserRoles.AddCarAdmin)) {
      this.formGroup.get('name').disable();
      this.formGroup.get('notes').disable();
    }
  }

  private applyForm() {
    this.currentModel.name = this.formGroup.controls["name"].value;
    this.currentModel.notes = this.formGroup.controls["notes"].value;
    this.setTextNames();
  }

  private getLocalizedTitle(languageValue: string): string {
    const title = this.currentModel.localizedTitles.find(a => a.languageUID === languageValue);
    if (title)
      return title.content;
    return null;
  }

  private getLocalizedText(languageValue: string): TextEntryViewModel {
    const title = this.currentModel.localizedTexts.find(a => a.languageUID === languageValue);
    if (title)
      return title;
    const entry = new TextEntryViewModel(languageValue);
    this.currentModel.localizedTexts.push(entry);
    return entry;
  }
  
  private setTextNames() {
    this.currentModel.localizedTexts.forEach(a => {
      a.name = `Text for page '${this.currentModel.name}'`;
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
      this.defaultService.saveWidget(this.currentModel).subscribe(res => {
        this.isSubmitting = false;
        this.formGroup.enable();
        this.notificationService.showSuccess(isDraft ? "Page was successfully saved as draft" : "Page was successfully saved");
        // if (this.currentModel.isCountrySpecific) {
        //   const url = this.countryPageUrlService.getPageDetailsUrl(this.currentModel.countryPageType, this.currentModel.countryUid);
        //   this.router.navigateByUrl(url);
        // } else {
        //   this.router.navigateByUrl(`/content-management/pages/${res.uid}`);
        // }
        this.router.navigateByUrl(`/content-management/widgets/${res.uid}`);
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

  onLanguageChange(languageValue: LanguageListItem) {
    if (languageValue) {
      this.fields.name.enable();
      this.applyForm();
      //this.fields.name.setValue(this.getLocalizedTitle(languageValue.uid));
      this.currentText = this.getLocalizedText(languageValue.uid);
    }
    else {
      this.fields.name.disable();
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
  
  isValid(): boolean {
    let result = this.formGroup.valid;
    return result;
  }
}
