import { Component } from '@angular/core';
import { CartService } from '../../orders/services/cart.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isSearching: boolean = false;
  cartentries: number = 0;
  private cartItemsSubscription!: Subscription;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartItemsSubscription = this.cartService.cartItems$.subscribe(cartItems => {
      this.cartentries = cartItems.length;
    });
  }

  ngOnDestroy(): void {
    this.cartItemsSubscription.unsubscribe();
  }

  toggleSearch(): void {
    this.isSearching = !this.isSearching;
  }
}
