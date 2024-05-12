import { Component, Inject } from '@angular/core';
import { UsersFacade } from 'src/app/libs/state/users/users.facade';
import { UsersComponent } from '../../../views/users/users.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogInfo } from 'src/app/libs/dashboard/shared/DeleteDialogInfo';


@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
    constructor(
    private usersFacade: UsersFacade,
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public deleteDialogInfo: DeleteDialogInfo,
  ) { }
    onNoClick(): void {
    this.dialogRef.close();
    }
  isDataLoading$ = this.usersFacade.isDataLoading$
  deleteEntity(deletDialogInfo : DeleteDialogInfo) {
    this.dialogRef.close(deletDialogInfo);
  }
}
