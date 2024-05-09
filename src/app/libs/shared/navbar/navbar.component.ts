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
    // Subscribe to cartItems$ observable to get updates on cart items
    this.cartItemsSubscription = this.cartService.cartItems$.subscribe(cartItems => {
      // Calculate total number of items in the cart
      this.cartentries = cartItems.reduce((total, item) => total + item.quantity, 0);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the observable to prevent memory leaks
    this.cartItemsSubscription.unsubscribe();
  }

  toggleSearch(): void {
    this.isSearching = !this.isSearching;
  }
}
