import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProfileListItem } from '@app-shared/models/user-profile-list-item.model';

@Component({
  templateUrl: 'user-delete-dialog.component.html',
  styleUrls: ['user-delete-dialog.component.css'],
})
export class UserDeleteDialogComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<UserDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: UserProfileListItem,
  ) {}

  public close(result: boolean) {
    this.dialogRef.close(result);
  }
}
