import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { TextEntryViewModel } from '../../shared/models/localization/text-entry-view-model.model';
import { TranslateService } from '../../shared/services/localization/translate.service';

@Component({
  selector: 'app-interpreter-view-content-pages',
  templateUrl: './interpreter-view-content-pages.component.html',
  styleUrls: ['./interpreter-view-content-pages.component.css']
})
export class InterpreterViewContentPagesComponent implements OnInit {

  textModel: TextEntryViewModel;


  constructor(
    private translateservice: TranslateService,
  ) { }

  uid: string;
  public needsDarkEditorTheme = false;

  ngOnInit(): void {

    this.uid = '4b741284-cf13-4883-9e58-08cb5c13d6e4';
    this.translateservice.getContent(this.uid).subscribe(res => {
       this.textModel = new TextEntryViewModel('81be1125-b9b2-4a77-bcb0-bb7420b8b6dd');

      this.textModel.content = res;

     
    });
    
  }

}
