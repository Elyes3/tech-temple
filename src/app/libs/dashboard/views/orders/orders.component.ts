import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { OrdersFacade } from 'src/app/libs/state/orders/orders.facade';
import { OrdersService } from '../../services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Order } from 'src/app/libs/shared/models/Order';
import { DeleteDialogComponent } from '../../components/dialogs/delete-dialog/delete-dialog.component';
import { merge, tap } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  @ViewChild(MatSort,{static: false}) sort!: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Order>;
  constructor(
    private ordersFacade: OrdersFacade,
    private ordersService: OrdersService,
    private changeDetector: ChangeDetectorRef,
    public ordersFormDialog: MatDialog,
    public deleteDialog: MatDialog
  )
  {  
      this.allOrders$.subscribe(orders => {
      this.dataSource = new MatTableDataSource(orders);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  allOrders$ = this.ordersFacade.allOrders$
  isLoading$ = this.ordersFacade.isLoading$;
  displayedColumns = ['id', 'code', 'OrderStatus','fullName','placedDate','InvoiceStatus','actions']
  orderCount = 0;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngAfterViewInit(): void {
        this.sort.initialized.subscribe(() => {
            this.ordersService.countOrders().subscribe((count: any) => this.orderCount = count);
            this.ordersFacade.loadOrdersWithPaginationAndSort({
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
         this.ordersFacade.loadOrdersWithPaginationAndSort({
          page: this.paginator.pageIndex,
          order: this.sort.direction,
          sort: this.sort.active,
          size: 3,
         })
      })
    ).subscribe()
    this.changeDetector.detectChanges();
  }
    openDeleteDialog(id: string): void{
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent,
      {
        data: {
          message: 'Are you sure you want to delete this order ?',
          id
        }  
      }
    );
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.ordersService.deleteOrder(id).subscribe(() => {
          this.orderCount--;
          this.ordersFacade.loadOrdersWithPaginationAndSort({
              page: this.paginator.pageIndex,
              order: this.sort.direction,
              sort: this.sort.active,
              size: 3,     
          })
        })
        this.allOrders$.subscribe(orders => {
          if (orders.length == 0 && this.paginator.pageIndex != 0) {
            this.paginator.previousPage();
          }
        })
      }

    })
  }
  cancelOrderDialog(order : Order): void {
      const dialogRef =  this.ordersFormDialog.open(DeleteDialogComponent, {
        data: {
          order, 
          message: 'Are you sure you want to cancel this order?'
        }  
      });
    dialogRef.afterClosed().subscribe((order: Order) => {
        if (order) {
          this.ordersFacade.updateOrder(order)
        } 
      })
  }
}
