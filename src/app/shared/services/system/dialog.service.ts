import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map } from 'rxjs/operators';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { LabelTranslatorLinkComponent } from '../../../layout/content-management/label-translator-link/label-translator-link.component';
import { TranslationListItem } from '../../models/localization/translation-list-item.model';
import { LabelTranslationListItem } from '../../models/localization/label-translation-list-item.model';
import { LabelTranslatorLink } from '../../models/content/label-translator-link.model';
import { PageTranslatorLink } from '../../models/content/page-translator-link-model';
import { PagesTranslatorLinkComponent } from '../../../layout/content-management/pages-translator-link/pages-translator-link.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService  {

  constructor(
    private dialog: MatDialog,
    private spinnerService: SpinnerOverlayService,

  ) { }

  oneButton(caption: string, text: string, button1Text: string): Observable<any> {

    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.componentInstance.caption = caption;
    dialogRef.componentInstance.text = text;
    dialogRef.componentInstance.button1Text = button1Text;
    dialogRef.componentInstance.onebutton = true;
    return dialogRef.afterClosed();
  }

  twoButtons(caption: string, text: string, button1Text: string, button2Text: string): Observable<any> {

    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.componentInstance.caption = caption;
    dialogRef.componentInstance.text = text;
    dialogRef.componentInstance.button1Text = button1Text;
    dialogRef.componentInstance.button2Text = button2Text;
    dialogRef.componentInstance.twobutton =true;
    return dialogRef.afterClosed().pipe(
      map((res) => {
        this.spinnerService.hide();
        return res;
      }),
    );
  }


  threeButtons(caption: string, text: string, button1Text: string, button2Text: string, button3Text: string): Observable<any> {

    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.componentInstance.caption = caption;
    dialogRef.componentInstance.text = text;
    dialogRef.componentInstance.button1Text = button1Text;
    dialogRef.componentInstance.button2Text = button2Text;
    dialogRef.componentInstance.button3Text = button3Text;
    dialogRef.componentInstance.threebutton = true;
    return dialogRef.afterClosed().pipe(
      map((res) => {
        this.spinnerService.hide();
        return res;
      }),
    );
  }
  generateLink(translationLinkModel: LabelTranslatorLink) {

 
    const dialogRef = this.dialog.open(LabelTranslatorLinkComponent, {
      width: '35%',

    });
    dialogRef.componentInstance.currentModel = translationLinkModel;
   
    
  }
  generatePageLink(pagesLinkModel: PageTranslatorLink,pageName:string,pageUid:string) {


    const dialogRef = this.dialog.open(PagesTranslatorLinkComponent, {
      width: '35%',

    });

    dialogRef.componentInstance.currentModel = pagesLinkModel;
    dialogRef.componentInstance.pageName = pageName;
    dialogRef.componentInstance.pageUid = pageUid;
  }
}
