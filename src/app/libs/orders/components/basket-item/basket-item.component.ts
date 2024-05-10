import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/libs/shared/models/CartItem';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent implements OnInit, OnDestroy {
  @Input() item!: CartItem;
  totalPrice!: number;
  private cartItemsSubscription!: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.calculateTotalPrice();
    this.cartItemsSubscription = this.cartService.cartItems$.subscribe(cartItems => {
      const updatedItem = cartItems.find(cartItem => cartItem.id === this.item.id);
      if (updatedItem) {
        this.item = updatedItem;
        this.calculateTotalPrice();
      }
    });
  }

  ngOnDestroy() {
    this.cartItemsSubscription.unsubscribe();
  }

  incrementQuantity() {
    this.item.quantity++;
    this.updateItem();
  }

  decrementQuantity() {
    if (this.item.quantity > 0) {
      this.item.quantity--;
      this.updateItem();
    }
  }

  updateItem() {
    this.calculateTotalPrice();
    this.cartService.updateCartItem(this.item);
  }

  calculateTotalPrice() {
    this.item.totalPrice = this.item.product.price * this.item.quantity;
  }

  onDeleteButtonClick() {
    this.cartService.removeItemFromCart(this.item.id);
  }
}
