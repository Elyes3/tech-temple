import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesComponent } from '../../../views/categories/categories.component';
import { Category } from 'src/app/libs/shared/models/Category';

@Component({
  selector: 'app-category-form-dialog',
  templateUrl: './category-form-dialog.component.html',
  styleUrls: ['./category-form-dialog.component.scss']
})
export class CategoryFormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data : Category,
  ) { }
    onNoClick(): void {
    this.dialogRef.close();
    }
  sendCategory(data: Category) {
    this.dialogRef.close(data);
  }
}
