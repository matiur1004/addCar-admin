import { Component } from "@angular/core";

@Component({
  template: `
   <a href="javascript:void(0)" class="btn-simple btn-clone" (click)="btnClickedHandler($event)" >
     <i class="fas fa-globe link-add"></i>
   </a>`
})
export class TranslateButtonRenderer {

  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(event) {
    if (this.params.clicked) {
      this.params.clicked(event, this.params);
    }
  }
}
