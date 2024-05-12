import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../../../libs/shared/models/CartItem';
import { Observable, Subscription } from 'rxjs';
import { OrderItemStatus } from 'src/app/libs/shared/enum/OrderItemStatus';
import { OrderStatus } from 'src/app/libs/shared/enum/OrderStatus';
import { Order } from 'src/app/libs/shared/models/Order';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { UsersFacade } from 'src/app/libs/state/users/users.facade';
import { User } from 'src/app/libs/auth/shared/User';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  userId: string | undefined;
  cartItems: CartItem[] = [];
  private cartItemsSubscription: Subscription;
  cartPrice: number = 0;
  orderId: string = '';
  constructor(private cartService: CartService, private orderService: OrderService, private router: Router, private usersFacade: UsersFacade) {
    this.cartItemsSubscription = this.cartService.cartItems$.subscribe(cartItems => {
      this.cartItems = cartItems;
      this.getCartPrice();
    });
  }
  authenticatedUser$!: Observable<any>;
  authenticatedUser: any;
  ngOnInit(): void {
    this.usersFacade.authenticatedUser$.subscribe(authenticatedUser => {
      if (!authenticatedUser) {
        // Handle case where user data is not available
        return;
      }
      // Assign the authenticated user data
      this.authenticatedUser = authenticatedUser.authenticatedUser;
      // Now you can access authenticatedUser here
      console.log(this.authenticatedUser);
      // Example: Accessing name and role
      console.log('Name:', this.authenticatedUser.name);
      console.log('Role:', this.authenticatedUser.role);
    });
    this.loadCartItems();
  }

  loadCartItems() {
  }

  clearCart() {
    this.cartService.clearCart();
  }
  ngOnDestroy() {
    this.cartItemsSubscription.unsubscribe();
  }

  getCartPrice() {
    this.cartPrice = this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }


  createOrder() {
    const orderItems: any = this.cartItems.map(cartItem => {
      return {
        product_id: cartItem.product.id,
        quantity: cartItem.quantity,
        totalPrice: cartItem.totalPrice
      };
    });

    this.usersFacade.authenticatedUser$.subscribe((authenticatedUser) => {
      this.userId = authenticatedUser.authenticatedUser?.id;
    })

    const orderData: any = {
      customer_id: this.userId,
      orderItems: orderItems,
    };

    this.orderService.createOrder(orderData).subscribe(
      (order: any) => {
        console.log('Order created successfully:', order);
        const orderId = order.id;
        this.router.navigate(['/checkout', orderId]);
      },
      error => {
        console.error('Error creating order:', error);
      }
    );
  }
}
