import { Component } from '@angular/core';
import { CartItem } from 'src/app/libs/shared/models/CartItem';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cartItems: CartItem[] = [];
  private cartItemsSubscription: Subscription;
  cartPrice: number = 0;

  constructor(private cartService: CartService, private orderService: OrderService) {
    this.cartItemsSubscription = this.cartService.cartItems$.subscribe(cartItems => {
      this.cartItems = cartItems;
      this.getCartPrice();
    });
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.cartItemsSubscription.unsubscribe();
  }

  getCartPrice() {
    this.cartPrice = this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }


}
