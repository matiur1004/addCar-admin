import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-activate-dialog',
  templateUrl: './user-activate-dialog.component.html',
  styleUrls: ['./user-activate-dialog.component.css']
})
export class UserActivateDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<UserActivateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  close(result)
  {
    this.dialogRef.close(result);
  }

}
