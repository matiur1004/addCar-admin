import { ChangeDetectionStrategy, Component, ErrorHandler, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { translate } from '@angular/localize/src/translate';
import { MatSelectTrigger } from '@angular/material/select';
import { LabelTranslatorLink } from '../../../shared/models/content/label-translator-link.model';
import { PageTranslatorLink } from '../../../shared/models/content/page-translator-link-model';
import { CountryListItem } from '../../../shared/models/franchisee/country-list-item.model';
import { LabelTranslationListItem } from '../../../shared/models/localization/label-translation-list-item.model';
import { LanguageListItem } from '../../../shared/models/localization/language-list-item.model';
import { TranslationRequestViewModel } from '../../../shared/models/localization/translation-request-view-model.model';
import { LanguageService } from '../../../shared/services/code-book/language.service';
import { CountryService } from '../../../shared/services/franchisee/country.service';
import { LabelService } from '../../../shared/services/localization/label.service';
import { DialogService } from '../../../shared/services/system/dialog.service';
import { LabelTranslatorLinkComponent } from '../label-translator-link/label-translator-link.component';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.css'],
})
export class PageSettingsComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;

  public languageSource: LanguageListItem[];
  public translateLanguageSource: any[] = [];
  public removedLanguageSource: LanguageListItem[] = [];
  public countrySource: CountryListItem[];

  isLanguageLoading = false;
  isCountryLoading = false;

  private defaultLanguage = 'd1f44d1b-5581-4f26-80d8-25fdec7b7086';
  private currentLanguageUid: string = null;

  private languageChangeHandler;   //This handler is called when language control changed
  private countryChangeHandler;   //This handler is called when language control changed

  // convenience getter for easy access to form fields
  get fields() { return this.formGroup.controls; }

  @Output() languageChanged = new EventEmitter<LanguageListItem>();

  @Output() translationsRequested = new EventEmitter<TranslationRequestViewModel>();
  @Output() duplicationsRequested = new EventEmitter<TranslationRequestViewModel>();

  @Input() isCountrySpecific: boolean;

  @Input() codeCount: string;
  @Input() pageUid: string;
  @Input() pageName: string;

  @Input() isLabelsList: boolean;

  newPage: boolean;

  countVal: boolean;

  constructor(private formBuilder: FormBuilder,
    private languageService: LanguageService,
    private countryService: CountryService,
    private errorHandler: ErrorHandler,
    private dialogservice: DialogService,
    private labelservice: LabelService,) {
  }

  ngOnInit() {
    this.createForm();
    this.loadLists();
  }
  ngOnChanges(changes) {

    if (changes.codeCount != undefined) {
      if (changes.codeCount.currentValue != 0) {
        this.countVal = true;
      }
      else this.countVal = false;
    }
    if (changes.pageUid != undefined) {
      if (changes.pageUid.currentValue != undefined) {
        this.newPage = true
      }
      else
        this.newPage = false;
    }
  }
  private loadLists() {
    //Language
    this.isLanguageLoading = true;
    if (this.fields)
      this.fields.language.disable();
    this.languageService.getLanguages().subscribe(res => {
      this.languageSource = res;
      this.translateLanguageSource = res.map(item => {
        item['isTranslate'] = false;
        item['isDuplicate'] = false;
        return item;
      })
      this.isLanguageLoading = false;
      if (this.fields) {
        this.fields.language.enable();
        this.fields.language.setValue(this.defaultLanguage);
      }
    });
    //End of Language

    //Country
    this.isCountryLoading = true;
    if (this.fields)
      this.fields.country.disable();
    this.countryService.loadFranchiseeCountries().subscribe(res => {
      this.countrySource = res;
      this.isCountryLoading = false;
      if (this.fields) {
        this.fields.country.enable();
        //if (this.isCountrySpecific)
        //  this.fields.country.setValue(this.defaultLanguage);
      }
    });
    //End of Language
  }

  createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      //name: new FormControl(this.currentModel.name, Validators.required),
      //url: new FormControl(this.currentModel.url, Validators.required),
      language: new FormControl(),
      country: new FormControl(),
      removedLanguage: new FormControl('')
      //title: new FormControl(),
    });

    //Change event subscriptions

    this.languageChangeHandler = this.formGroup.controls["language"].valueChanges
      .subscribe(languageValue => {
        if(languageValue) {
          this.currentLanguageUid = languageValue;
          let languageItem = this.languageSource.find((item) => item.uid == languageValue);
          this.languageChanged.emit(languageItem);
        }

        
      });
  }

  removeLanguage(item: any, index) {
    this.removedLanguageSource.push(item);
    this.translateLanguageSource.splice(index, 1);
  }

  onChangeSelection(event, languageItem, type) {
    if (type === 'translate') {
      if (event.target.checked == true) {
        languageItem['isTranslate'] = event.target.checked;
        languageItem['isDuplicate'] = !event.target.checked;
      }
      else {
        languageItem['isTranslate'] = !event.target.checked;

      }
    
    }
    else {
      if (event.target.checked == true) {
        languageItem['isDuplicate'] = event.target.checked;
        languageItem['isTranslate'] = !event.target.checked;
      }
      else {
        languageItem['isDuplicate'] = !event.target.checked;

      }

    }
  }

  onAddLanguage() {
    let langId = this.formGroup.get('removedLanguage').value;
    if(langId != '') {
      let languageItem = this.languageSource.find((item) => item.uid == langId);
      languageItem['isTranslate'] = false;
      languageItem['isDuplicate'] = false;
      this.translateLanguageSource.push(languageItem);
      this.translateLanguageSource = this.translateLanguageSource.sort((a, b) => {return a.name > b.name ? 1 : -1 } )
      this.removedLanguageSource.splice(this.removedLanguageSource.findIndex(item => item.uid == langId), 1);
      if(this.removedLanguageSource.length > 0)
        this.formGroup.get('removedLanguage').setValue(this.removedLanguageSource[0]['uid']);
      else 
        this.formGroup.get('removedLanguage').setValue(null);
    }
  }

  onTranslateClick() {
    const translateRequest = new TranslationRequestViewModel({
      sourceLanguageUid: this.currentLanguageUid,
      destinationLanguageUids: this.translateLanguageSource.filter(a => a.isTranslate === true && a.uid !== this.currentLanguageUid).map(b => b.uid)
    });

    if (translateRequest.destinationLanguageUids.length > 0)
      this.translationsRequested.emit(translateRequest);

    const duplicateRequest = new TranslationRequestViewModel({
      sourceLanguageUid: this.currentLanguageUid,
      destinationLanguageUids: this.translateLanguageSource.filter(a => a.isDuplicate === true && a.uid !== this.currentLanguageUid).map(b => b.uid)
    });

    if (duplicateRequest.destinationLanguageUids.length > 0)
      this.duplicationsRequested.emit(duplicateRequest);
  }



  generateLinkdialog() {

    const translatorLinkModel = new LabelTranslatorLink;

    this.dialogservice.generateLink(translatorLinkModel);

  }
  openDialog() {
    if (this.pageUid != undefined) {
      const pagesLinkModel = new PageTranslatorLink;
      this.dialogservice.generatePageLink(pagesLinkModel, this.pageName, this.pageUid);
    }

  }

  //Unsubscribe from subscriptions here
  ngOnDestroy() {
    if (this.languageChangeHandler)
      this.languageChangeHandler.unsubscribe();

    if (this.countryChangeHandler)
      this.countryChangeHandler.unsubscribe();

  }
}
