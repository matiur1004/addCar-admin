import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    private readonly dialogRef: MatDialogRef<DialogComponent>,
  ) { }

  onebutton: boolean = false;
  twobutton: boolean = false;
  threebutton: boolean = false;

  caption: string;
  text: string;
  button1Text: string;
  button2Text: string;
  button3Text: string;


  public close(result: number) {
    this.dialogRef.close(result);
  }

}
