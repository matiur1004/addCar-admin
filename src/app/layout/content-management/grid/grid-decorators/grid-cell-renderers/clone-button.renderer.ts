import { Component } from "@angular/core";

@Component({
  template: `
   <a href="javascript:void(0)" class="btn-simple btn-clone" (click)="btnClickedHandler()" >
    <i class="far fa-clone link-add"></i>
   </a>`
})
export class CloneButtonRenderer {

  private params: any;
  
  agInit(params: any): void {
    this.params = params;
   
  }

  btnClickedHandler() {

    this.params.gridparam.clonewhenclicked(this.params, this.params.gridparam);

  }
}
