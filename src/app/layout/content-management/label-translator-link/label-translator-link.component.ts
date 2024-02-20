// Code behind logic for LabelTranslatorLinkComponent

// Initially powered by Stantum Angular Utils.
// Want to dramatically increase your development speed too? Visit https://www.stantum.cz/development-automation

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { LabelTranslatorLink } from '../../../shared/models/content/label-translator-link.model';
import { LabelTranslatorLinkViewModel } from '../../../shared/models/localization/label-translator-link-view-model.model';
import { LanguageListItem } from '../../../shared/models/localization/language-list-item.model';
import { MessageCodes } from '../../../shared/models/system/message-codes';
import { LanguageService } from '../../../shared/services/code-book/language.service';
import { LabelService } from '../../../shared/services/localization/label.service';
import { TranslateService } from '../../../shared/services/localization/translate.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-label-translator-link',
  templateUrl: './label-translator-link.component.html'
})

export class LabelTranslatorLinkComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public languageUidSource: LanguageListItem[];
  public isLanguageUidLoading = false;

  private _currentModel: LabelTranslatorLink;

  @Input('inputModel')
  set currentModel(val: LabelTranslatorLink) {
    this._currentModel = val;
    if (this.formGroup)
      this.updateForm();
    else
      this.createForm();
  }

  get currentModel(): LabelTranslatorLink { return this._currentModel };

  submitted = false;



  // convenience getter for easy access to form fields
  get fields() { return this.formGroup.controls; }

  constructor(private formBuilder: FormBuilder, private languageService: LanguageService,
    private labelservice: LabelService, private readonly dialogRef: MatDialogRef<LabelTranslatorLink>,
    private transalateservice: TranslateService,
    private notificationService: NotificationService,

  ) {

  }

  ngOnInit() {
    if (this.currentModel)
      this.createForm();
    this.loadLists();
  }

  private loadLists() {
    //LanguageUid
    this.isLanguageUidLoading = true;
    if (this.fields)
      this.fields.languageUid.disable();
    this.languageService.getLanguagesexceptEnglish().subscribe(res => {
      this.languageUidSource = res;
      this.isLanguageUidLoading = false;
      if (this.fields)
        this.fields.languageUid.enable();
    });
    //End of LanguageUid

  }

  //Applied to a new form
  //Requires unsubscribe
  createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      translatorEmail: new FormControl(this.currentModel.translatorEmail, Validators.compose([Validators.required, Validators.email])),
      languageUid: new FormControl(this.currentModel.languageUid, Validators.required),


    });

    //Change event subscriptions



  }

  //Applied after the model saved
  updateForm() {
    this.formGroup.patchValue({
      translatorEmail: this.currentModel.translatorEmail,
      languageUid: this.currentModel.languageUid,


    });
  }

  //Update the model with the form values
  private applyForm() {
    this.currentModel.translatorEmail = this.formGroup.controls["translatorEmail"].value;
    this.currentModel.languageUid = this.formGroup.controls["languageUid"].value;

  }

  //Save the model and update it from the service
  save() {
    this.submitted = true;
    if (this.isValid()) {
      this.applyForm();
      this.updateForm();
      const labelTranslatorLinkViewModel = new LabelTranslatorLinkViewModel;
      labelTranslatorLinkViewModel.translatorEmail = this.currentModel.translatorEmail;
      labelTranslatorLinkViewModel.languageUid = this.currentModel.languageUid;
      labelTranslatorLinkViewModel.labelCodes = this.labelservice.getLabelCodes();

      this.transalateservice.saveLabelTranslation(labelTranslatorLinkViewModel).subscribe(res => {
        this.notificationService.showSuccessMessage(MessageCodes.LabelLinkCreationSuccess);
      }, error => {
        this.notificationService.showErrorMessage(MessageCodes.LabelLinkCreationError);
      });
    
      this.labelservice.clearSelectItems();
      this.dialogRef.close();
    }

  }

  enable() {
    this.formGroup.enable();
  }

  disable() {
    this.formGroup.disable();
  }

  //Validate the control
  isValid(): boolean {
    const result = this.formGroup.valid;
    return result;
  }
  clear() {

    this.dialogRef.close();


  }
  //Unsubscribe from subscriptions here
  ngOnDestroy() {

  }
}
