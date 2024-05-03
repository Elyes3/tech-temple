import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ProductsFacade } from 'src/app/libs/state/products/products.facade';
import { ProductsService } from '../../services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteDialogComponent } from '../../components/dialogs/delete-dialog/delete-dialog.component';
import { Product } from 'src/app/libs/shared/models/Product';
import { ProductFormDialogComponent } from '../../components/dialogs/product-form-dialog/product-form-dialog.component';
import { OrderItemStatus } from 'src/app/libs/shared/enum/OrderItemStatus';
import { CategoriesFacade } from 'src/app/libs/state/categories/categories.facade';
import { Category } from 'src/app/libs/shared/models/Category';
import { Observable, merge, tap } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Product>;
  constructor(
    private categoriesFacade: CategoriesFacade,
    private productsFacade: ProductsFacade,
    private productsService: ProductsService,
    private changeDetector: ChangeDetectorRef,
    public productFormDialog: MatDialog,
    public DeleteDialog: MatDialog,
  ) {
    this.allProducts$.subscribe(products => {
      console.log(products);
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  allCategories$ : Observable<Category[]> = this.categoriesFacade.allCategories$
  allProducts$ : Observable<Product[]> = this.productsFacade.allProducts$
  isDataLoading$ : Observable<boolean> = this.productsFacade.isLoading$; 
  categories : Category[] = [];
  // Default call.
  displayedColumns = ['id', 'name', 'description', 'productCategory', 'price', 'brand', 'status', 'actions']
  productCount = 0;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDeleteDialog(id: string): void{
    const dialogRef = this.DeleteDialog.open(DeleteDialogComponent,
      {
        data: {
          message: 'Are you sure you want to delete this product ?',
          id
        }  
      }
    );
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.productsService.deleteProduct(id).subscribe(() => {
          this.productCount--;
          this.productsFacade.loadProductsWithPaginationAndSort({
              page: this.paginator.pageIndex,
              order: this.sort.direction,
              sort: this.sort.active,
              size: 3,     
          })
        })
        this.allProducts$.subscribe(products => {
          if (products.length == 0) {
            this.paginator.previousPage();
          }
        })
      }

    })
  }
  openCreateDialog(): void {
    const dialogRef = this.productFormDialog.open(ProductFormDialogComponent, {
      data: {
        product: {
          id: '',
          name: '',
          description: '',
          productCategory: {
            name: '',
            description: '',
            products: []
          },
          brand: '',
          status: OrderItemStatus.ACTIVE,
          img1: '',
          img2: '',
          img3: '',
          img4: ''
        },
        categories: this.categories
      }
    })
    dialogRef.afterClosed().subscribe(product => {
        if (product) {
          this.productsService.addProduct(product).subscribe(() => {
            this.productCount++;
            this.productsFacade.loadProductsWithPaginationAndSort({
              page: this.paginator.pageIndex,
              order: this.sort.direction,
              sort: this.sort.active,
              size: 3,              
            })
          })
        } 
      })
  }
  openUpdateDialog(product : Product) {
      const dialogRef =  this.productFormDialog.open(ProductFormDialogComponent, {
      data: {
        product: {
          id: product.id,
          name: product.name,
          description: product.description,
          productCategory: product.productCategory,
          brand: product.brand,
          price: product.price,
          status: product.status,
          img1: product.img1,
          img2: product.img2,
          img3: product.img3,
          img4: product.img4
        },
        categories: this.categories
      }
      });
    dialogRef.afterClosed().subscribe(product => {
        if (product) {
          this.productsFacade.updateProduct(product)
        }
      })
  }
  ngOnInit() {
    this.categoriesFacade.loadCategories();
    this.allCategories$.subscribe(categories => {
      this.categories = categories;          
      this.categories = categories;          
    }) 
  }
  ngAfterViewInit(): void {
    this.sort.initialized.subscribe(() => {
            this.productsService.countProducts().subscribe((count: any) => this.productCount = count.count);
            this.productsFacade.loadProductsWithPaginationAndSort({
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
         this.productsFacade.loadProductsWithPaginationAndSort({
          page: this.paginator.pageIndex,
          order: this.sort.direction,
          sort: this.sort.active,
          size: 3,
         })
      })
    ).subscribe()
    this.changeDetector.detectChanges();
    
  }
}