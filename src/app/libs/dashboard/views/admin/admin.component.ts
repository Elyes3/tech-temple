import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersFacade } from 'src/app/libs/state/users/users.facade';
import { IsOpenService } from '../../services/isopen.service';
import { AuthService } from 'src/app/libs/auth/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  menuItems = [{
    icon: 'person',
    name: 'Users',
    path: 'users'
  },
  {
    icon: 'inventory_2',
    name: 'Products',
    path: 'products'
  },
  {
    icon: 'article',
    name: 'Orders',
    path: 'orders'
  },
  {
    icon: 'category',
    name: 'Categories',
    path: 'categories'
  }
  ]
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef,
    private isOpenService: IsOpenService,
    media: MediaMatcher,
    private usersFacade: UsersFacade,
    private authService: AuthService,
    private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  allUsers$ = this.usersFacade.allUsers$;
  currentRoute =
    this.router.url == '/admin/users' ? 'Users' :
      this.router.url === '/admin/products' ? 'Products' :
        this.router.url === '/admin/categories' ? 'Categories' :
          'Orders';
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

  }
  setIsOpen() {
    this.isOpenService.setIsOpen();
  }
  logout() {
    console.log("CALLED");
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
