import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PageTranslatorLink } from '../../../shared/models/content/page-translator-link-model';
import { LanguageListItem } from '../../../shared/models/localization/language-list-item.model';
import { PageTranslatorLinkViewModel } from '../../../shared/models/localization/page-translator-link-view-model.model';
import { MessageCodes } from '../../../shared/models/system/message-codes';
import { LanguageService } from '../../../shared/services/code-book/language.service';
import { LabelService } from '../../../shared/services/localization/label.service';
import { TranslateService } from '../../../shared/services/localization/translate.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-pages-translator-link',
  templateUrl: './pages-translator-link.component.html',
  styleUrls: ['./pages-translator-link.component.css']
})
export class PagesTranslatorLinkComponent implements OnInit {

  public formGroup: FormGroup;
  public languageUidSource: LanguageListItem[];


  private _currentModel: PageTranslatorLink;
  pageName: string;
  pageUid: string;

  @Input('inputModel')
  set currentModel(val: PageTranslatorLink) {
    this._currentModel = val;
    if (this.formGroup)
      this.updateForm();
    else
      this.createForm();
  }

  get currentModel(): PageTranslatorLink { return this._currentModel };

  submitted = false;



  // convenience getter for easy access to form fields
  get fields() { return this.formGroup.controls; }

  constructor(private formBuilder: FormBuilder,
    private labelservice: LabelService, private readonly dialogRef: MatDialogRef<PageTranslatorLink>,
    private languageService: LanguageService, private transalateservice: TranslateService,
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
    this.languageService.getLanguagesexceptEnglish().subscribe(res => {
      this.languageUidSource = res;
    });

    //End of LanguageUid

  }

  //Applied to a new form
  //Requires unsubscribe
  createForm() {
    //Form controls creation
    this.formGroup = this.formBuilder.group({
      interpreterEmail: new FormControl(this.currentModel.interpreterEmail, Validators.compose([Validators.required, Validators.email])),
      languageUid: new FormControl(this.currentModel.languageUid, Validators.required),


    });

    //Change event subscriptions



  }

  //Applied after the model saved
  updateForm() {
    this.formGroup.patchValue({
      interpreterEmail: this.currentModel.interpreterEmail,
      languageUid: this.currentModel.languageUid,


    });
  }

  //Update the model with the form values
  private applyForm() {
    this.currentModel.interpreterEmail = this.formGroup.controls["interpreterEmail"].value;
    this.currentModel.languageUid = this.formGroup.controls["languageUid"].value;

  }

  //Save the model and update it from the service
  save() {
    this.submitted = true;
    if (this.isValid()) {
      this.applyForm();
      this.updateForm();
      const pageTranslatorLinkViewModel = new PageTranslatorLinkViewModel;
      pageTranslatorLinkViewModel.translatorEmail = this.currentModel.interpreterEmail;
      pageTranslatorLinkViewModel.languageUid = this.currentModel.languageUid;
      pageTranslatorLinkViewModel.pageUid = this.pageUid;

      this.transalateservice.savePageTranslation(pageTranslatorLinkViewModel).subscribe(res => {
        this.notificationService.showSuccessMessage(MessageCodes.PageLinkCreationSuccess);
      }, error => {
        this.notificationService.showErrorMessage(MessageCodes.PageLinkCreationError);
        // console.log(res+"the  uid ");
      });      this.dialogRef.close();
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
