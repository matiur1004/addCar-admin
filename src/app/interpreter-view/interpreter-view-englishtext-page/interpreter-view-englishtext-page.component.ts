import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '../../shared/services/localization/translate.service';

@Component({
  selector: 'app-interpreter-view-englishtext-page',
  templateUrl: './interpreter-view-englishtext-page.component.html',
  styleUrls: ['./interpreter-view-englishtext-page.component.css']
})
export class InterpreterViewEnglishtextPageComponent implements OnInit {


  temp: string;
  temp1: SafeHtml
  constructor(
    private translateservice: TranslateService,
    private sanitizer: DomSanitizer,

  ) { }
  public get htmlProperty(): SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, this.temp);
    
  }
  ngOnInit(): void {
    this.translateservice.getEnglishText('4b741284-cf13-4883-9e58-08cb5c13d6e4').subscribe(res => {
      this.temp = res;
    });

  }
 

}
