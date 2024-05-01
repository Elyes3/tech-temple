import { Component, Inject } from '@angular/core';
import { UsersComponent } from '../../../views/users/users.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/libs/auth/shared/User';
import { Role } from 'src/app/libs/auth/shared/Role';
@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data : User,
  ) { }
    onNoClick(): void {
    this.dialogRef.close();
    }
  role = Role;
  sendUser(data: User) {
    this.dialogRef.close(data);
    data.password = '';
  }
  toggleEnabled() {
    this.data = {
      ...this.data
    }
  }
}
