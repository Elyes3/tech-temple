import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../../../libs/shared/models/CartItem';
import { Subscription } from 'rxjs';
import { OrderItemStatus } from 'src/app/libs/shared/enum/OrderItemStatus';
import { OrderStatus } from 'src/app/libs/shared/enum/OrderStatus';
import { Order } from 'src/app/libs/shared/models/Order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
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
    this.loadCartItems();
  }

  loadCartItems() {
    const sampleCartItem1: CartItem = {
      id: '1',
      product: {
        id: '1',
        name: 'Sample Product',
        description: 'Lorem ipsum dolor sit amet...',
        productCategory: {
          id: '1', name: 'Sample Category',
          description: 'pc',
          products: []
        },
        price: 19.99,
        brand: 'Sample Brand',
        status: OrderItemStatus.AVAILABLE,
        img1: 'https://www.asus.com/media/Odin/Websites/global/Series/9.png',
        img2: 'sample-img2.jpg',
        img3: 'sample-img3.jpg',
        img4: 'sample-img4.jpg'
      },
      quantity: 1,
      totalPrice: 19.99
    };
    const sampleCartItem2: CartItem = {
      id: '2',
      product: {
        id: '2',
        name: 'Sample Product 2',
        description: 'Lorem ipsum dolor sit amet...',
        productCategory: {
          id: '1', name: 'Sample Category',
          description: 'pc',
          products: []
        },
        price: 19.99,
        brand: 'Sample Brand',
        status: OrderItemStatus.AVAILABLE,
        img1: 'https://www.asus.com/media/Odin/Websites/global/Series/9.png',
        img2: 'sample-img2.jpg',
        img3: 'sample-img3.jpg',
        img4: 'sample-img4.jpg'
      },
      quantity: 1,
      totalPrice: 19.99
    };
    this.cartService.addItemToCart(sampleCartItem1);
    this.cartService.addItemToCart(sampleCartItem2);
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
        productId: cartItem.product.id,
        quantity: cartItem.quantity,
        totalPrice: cartItem.totalPrice
      };
    });

    const orderData: Order = {
      placedDate: new Date(),
      status: OrderStatus.PENDING,
      code: 'ORD123',
      customer: 'customer-id',
      orderItems: orderItems,
      id: ''
    };

    this.orderService.createOrder(orderData).subscribe(
      (order: Order) => {
        console.log('Order created successfully:', order);
        this.cartService.clearCart();
        this.cartItems = [];
      },
      error => {
        console.error('Error creating order:', error);
      }
    );
  }
}
