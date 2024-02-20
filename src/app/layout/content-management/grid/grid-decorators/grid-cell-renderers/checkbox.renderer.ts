import { Component } from "@angular/core";

@Component({
  template: `<input type="checkbox" [checked]="params.data.isChecked" (change)="chkbChangedHandler($event)"> `
})
export class CheckboxRenderer {

  params: any;

  agInit(params: any): void {
    this.params = params;
    
  }

  chkbChangedHandler(event) {
   
    this.params.value = !this.params.value;
    this.params.node.data.isChecked = this.params.value;
    if (event.target.checked==true) {
      this.params.gridparam.addCode(this.params);
      this.params.gridparam.clickHandler();
    }
    if (event.target.checked==false) {
      this.params.gridparam.deletecode(this.params);
      this.params.gridparam.clickHandler();

    }
    if (this.params.changed) {
      this.params.changed(event, this.params);
    }
  }
}
 
