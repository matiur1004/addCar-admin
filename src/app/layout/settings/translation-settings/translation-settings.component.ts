// Code behind logic for TranslationSettingsComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, OnInit, ErrorHandler, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '@app-shared/services/notification.service';
import { Converters } from '@app-shared/common/converters';
import { TranslationSettingsViewModel } from '@app-shared/models/translation-settings-view-model.model';
import { TranslationSettingsService } from '@app-shared/services/translation-settings.service';
import { LanguageListItem } from '../../../shared/models/localization/language-list-item.model';
import { LanguageService } from '../../../shared/services/code-book/language.service';

@Component({
  templateUrl: './translation-settings.component.html'
})

export class TranslationSettingsComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;

  public languageSource: LanguageListItem[];
  private defaultLanguage ;
  private currentLanguage: string = null;

  private routeDataSubscription: Subscription;  //Used for the current model retrieval from the resolver
  currentModel: TranslationSettingsViewModel;
  submitted = false;
  isSubmitting = false;
  public languages: Array<LanguageListItem>
  public chooselanguages: Array<LanguageListItem>
  public defaultlanguageuid;
  isLanguageLoading = false;

  private languageChangeHandler;   //This handler is called when language control changed

  // convenience getter for easy access to form fields
  get fields() { return this.formGroup.controls; }

  constructor(private formBuilder: FormBuilder,
    private defaultService: TranslationSettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private languageService: LanguageService,
    private errorHandler: ErrorHandler) {

  }

  ngOnInit() {
    this.routeDataSubscription = this.route.data.subscribe((data: { translationSettings: TranslationSettingsViewModel }) => {
      this.currentModel = data.translationSettings;
      this.languages = data.translationSettings.activeLanguages;
      this.defaultlanguageuid = data.translationSettings.defaultLanguageUid;
      
      if (this.currentModel)
        this.createForm();
    });
    this.loadLists();
  }

  private loadLists() {

    this.isLanguageLoading = true;
    if (this.fields)
      this.fields.language.disable();
    this.defaultService.getTranslationSettings().subscribe(res => {
      
      this.languages = res.activeLanguages;
      this.languageService.getLanguages().subscribe(newdata => {
        this.languageSource = newdata;
        this.chooselanguages = this.languageSource.filter(o1 => !this.languages.some(o2 => o1.name === o2.name));;
        this.defaultLanguage = this.chooselanguages[0].uid;

        this.isLanguageLoading = false;
        if (this.fields) {
          this.fields.language.enable();
          this.fields.language.setValue(this.defaultLanguage);
        }
      });
    });
  }


  //Applied to a new form
  //Requires unsubscribe
  createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      language: new FormControl(),


    });

    //Change event subscriptions

    this.languageChangeHandler = this.formGroup.controls["language"].valueChanges
      .subscribe(languageValue => {
    
        this.currentLanguage = languageValue;
      });


  }

  //Applied after the model saved
  updateForm() {
    this.formGroup.patchValue({


    });
  }

  //Update the model with the form values
  private applyForm() {

  }

  //Save the model and update it from the service
  save() {
    this.submitted = true;
    if (this.isValid()) {
      this.applyForm();
      this.isSubmitting = true;
      this.formGroup.disable();
      this.defaultService.addLanguage(this.currentLanguage).subscribe(res => {
        this.isSubmitting = false;
        this.formGroup.enable();
       this.notificationService.showSuccess("TranslationSettingsViewModel was successfully saved");
        this.loadLists();

        //this.currentModel = res;
        //this.updateForm();
       // this.router.navigateByUrl(`/settings/${res.uid}`);
      },
        err => {
         if (err.status === 401) {
           /*
           const dialogRef = this.dialog.open(ErrorDialogComponent, {
             data: {
                title: "Operation error",
                content: "You are not authorized to perform this action."
              }
            });

           dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl("home"));*/
           this.notificationService.showError("You are not authorized to perform this action");
           this.router.navigateByUrl("/");
         }
          this.isSubmitting = false;
          this.formGroup.enable();
          throw err;
       }
      );
    }
  }
  deletelanguage(uid: string) {
    this.defaultService.deleteLanguage(uid).subscribe((res) => {
      this.notificationService.showSuccess("The language was deleted successfully");
      
      this.loadLists();
    });
  }
  //Validate the control
  isValid(): boolean {
    const result = this.formGroup.valid;
    return result;
  }

  //Unsubscribe from subscriptions here
  ngOnDestroy() {
    if (this.routeDataSubscription)
      this.routeDataSubscription.unsubscribe();


  }
}
