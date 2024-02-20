import { Component } from "@angular/core";

@Component({
  template: `
   <a href="javascript:void(0)" class="btn-simple btn-remove" (click)="btnClickedHandler()" >
     <i class="far fa-trash-alt link-remove"></i>
   </a>`
})
export class DeleteButtonRenderer   {

  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.params.gridparam.deletewhenclicked(this.params, this.params.gridparam);
  }
}
