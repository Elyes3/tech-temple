import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, tap } from 'rxjs';
import { User } from 'src/app/libs/auth/shared/User';
import { UsersFacade } from 'src/app/libs/state/users/users.facade';
import { UsersService } from '../../services/users.service';
import { Role } from 'src/app/libs/auth/shared/Role';
import { UserFormDialogComponent } from '../../components/dialogs/user-form-dialog/user-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../components/dialogs/delete-dialog/delete-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<User>;
  constructor(
    private usersFacade: UsersFacade,
    private usersService: UsersService,
    private changeDetector : ChangeDetectorRef,
    public userFormDialog: MatDialog,
    public DeleteDialog: MatDialog
  )
  {  
      this.allUsers$.subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;      
    })
  }
  authenticatedUser = this.usersFacade.authenticatedUser$ 
  allUsers$ = this.usersFacade.allUsers$
  isDataLoading$ = this.usersFacade.isDataLoading$;
  // Default call.
  selectedValue: string = "all-roles";
    roles = [
    {value: 'all-roles', viewValue: 'All roles'},
    {value: Role.Client, viewValue: 'Client'},
    {value: Role.Admin, viewValue: 'Admin'},
    {value: Role.SuperAdmin, viewValue: 'Super Admin'}
    ];
  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'age', 'role', 'enabled', 'actions']
  userCount = 0;
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
          message: 'Are you sure you want to delete this user ?',
          id
        }  
      }
    );
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.usersService.deleteUser(id).subscribe(() => {
          this.userCount--;
          this.usersFacade.loadUsersWithPaginationAndSort({
              page: this.paginator.pageIndex,
              order: this.sort.direction,
              sort: this.sort.active,
              size: 3,     
          })
        })
        this.allUsers$.subscribe(users => {
          if (users.length == 0) {
            this.paginator.previousPage();
          }
        })
      }

    })
  }
  openCreateDialog(): void {
    const dialogRef =  this.userFormDialog.open(UserFormDialogComponent, {
      data: {
          id: '',
          firstName: '',
          lastName: '',
          age: 0,
          email: '',
          role: Role.Client,
          password: '',
      }  
    }
    );
    dialogRef.afterClosed().subscribe(user => {
        console.log(user)
        if (user) {
          this.usersService.addUser(user).subscribe(() => {
            this.userCount++;
            this.usersFacade.loadUsersWithPaginationAndSort({
              page: this.paginator.pageIndex,
              order: this.sort.direction,
              sort: this.sort.active,
              size: 3,              
            })
          })
          user.password = '';
        } 
      })
  }
  openUpdateDialog(user : User) {
      const dialogRef =  this.userFormDialog.open(UserFormDialogComponent, {
      data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          email: user.email,
          role: user.role,
          enabled: user.enabled,
        }  
      });
    dialogRef.afterClosed().subscribe(user => {
        if (user) {
          this.usersFacade.updateUser(user)
        } 
      })
  }
  ngAfterViewInit(): void {
        this.sort.initialized.subscribe(() => {
            this.usersService.countUsers().subscribe((count: any) => this.userCount = count.count);
            this.usersFacade.loadUsersWithPaginationAndSort({
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
         this.usersFacade.loadUsersWithPaginationAndSort({
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
