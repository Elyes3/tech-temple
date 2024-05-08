import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription, merge, tap } from 'rxjs';
import { CategoriesFacade } from '../../../state/categories/categories.facade';
import { CategoriesService } from '../../services/categories.service';
import { Category } from 'src/app/libs/shared/models/Category';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../components/dialogs/delete-dialog/delete-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryFormDialogComponent } from '../../components/dialogs/category-form-dialog/category-form-dialog.component';
import { IsOpenService } from '../../services/isopen.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements AfterViewInit,OnDestroy{
  @ViewChild(MatSort,{static: false}) sort!: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Category>;
  isOpen!: boolean;
  isOpenSubscription!: Subscription;
  allCategoriesSubscription!: Subscription;
  constructor(
    private categoriesFacade: CategoriesFacade,
    private categoriesService: CategoriesService,
    private changeDetector: ChangeDetectorRef,
    private isOpenService: IsOpenService,
    public categoriesFormDialog: MatDialog,
    public deleteDialog: MatDialog
  )
  {  this.isOpenSubscription = this.isOpenService.isOpen$.subscribe(isOpen => 
         this.isOpen = isOpen
       );
     this.allCategoriesSubscription = this.allCategories$.subscribe(categories => {
      this.dataSource = new MatTableDataSource(categories);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  allCategories$ = this.categoriesFacade.allCategories$
  isLoading$ = this.categoriesFacade.isLoading$;
  displayedColumns = ['id', 'name', 'description','actions']
  categoryCount = 0;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDeleteDialog(id: string): void{
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent,
      {
        data: {
          message: 'Are you sure you want to delete this category ?',
          id
        }
      }
    );
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.categoriesService.deleteCategory(id).subscribe(() => {
          this.categoryCount--;
          this.categoriesFacade.loadCategoriesWithPaginationAndSort({
              page: this.paginator.pageIndex,
              order: this.sort.direction,
              sort: this.sort.active,
              size: 3,     
          })
        })
        this.allCategories$.subscribe(categories => {
          if (categories.length == 0 && this.paginator.pageIndex != 0) {
            this.paginator.previousPage();
          }
        })
      }

    })
  }
  openCreateDialog(): void {
    const dialogRef = this.categoriesFormDialog.open(CategoryFormDialogComponent, {
      data: {
        id:'',
        name: '',
        description:'',
      }  
    }
    );
    dialogRef.afterClosed().subscribe(category => {
        console.log(category)
        if (category) {
          this.categoriesService.addCategory(category).subscribe(() => {
            this.categoryCount++;
            this.categoriesFacade.loadCategoriesWithPaginationAndSort({
              page: this.paginator.pageIndex,
              order: this.sort.direction,
              sort: this.sort.active,
              size: 3,              
            })
          })
        } 
      })
  }
  openUpdateDialog(category : Category) {
      const dialogRef =  this.categoriesFormDialog.open(CategoryFormDialogComponent, {
      data: {
          id: category.id,
          name: category.name,
          description: category.description
        }  
      });
    dialogRef.afterClosed().subscribe(category => {
        if (category) {
          this.categoriesFacade.updateCategory(category)
        } 
      })
  }
  ngAfterViewInit(): void {
        this.sort.initialized.subscribe(() => {
          this.categoriesService.countCategories().subscribe((count: any) => this.categoryCount = count);
            this.categoriesFacade.loadCategoriesWithPaginationAndSort({
              page: 0,
              order: 'desc',
              sort: 'id',
              size: 3,
            })
        })
        
        let sort$ = this.sort.sortChange.pipe(
      tap(() => (this.paginator.pageIndex = 0))
        );
    merge(sort$, this.paginator.page).pipe(
      tap(() => {
         this.categoriesFacade.loadCategoriesWithPaginationAndSort({
          page: this.paginator.pageIndex,
          order: this.sort.direction,
          sort: this.sort.active,
          size: 3,
         })
      })
    ).subscribe()
    this.changeDetector.detectChanges();
  }
  ngOnDestroy(): void {
    this.isOpenSubscription.unsubscribe();
    this.allCategoriesSubscription.unsubscribe();
  }
}
