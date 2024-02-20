import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  templateUrl: 'user-deactivate-dialog.component.html',
  styleUrls: ['user-deactivate-dialog.component.css']
})
export class UserDeactivateDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<UserDeactivateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  close(result)
  {
    this.dialogRef.close(result);
  }
}
