import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../../../libs/shared/models/CartItem';
import { Subscription } from 'rxjs';
import { OrderItemStatus } from 'src/app/libs/shared/enum/OrderItemStatus';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  cartItems: CartItem[] = [];
  private cartItemsSubscription: Subscription;

  constructor(private cartService: CartService) {
    this.cartItemsSubscription = this.cartService.cartItems$.subscribe(cartItems => {
      this.cartItems = cartItems;
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
        status: OrderItemStatus.ACTIVE,
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
        status: OrderItemStatus.ACTIVE,
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

  ngOnDestroy() {
    this.cartItemsSubscription.unsubscribe();
  }
}
