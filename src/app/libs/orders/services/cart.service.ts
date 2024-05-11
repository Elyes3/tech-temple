import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../../shared/models/CartItem';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
    cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

    constructor() {
        const storedCartItems = localStorage.getItem('cart');
        if (storedCartItems) {
            this.cartItemsSubject.next(JSON.parse(storedCartItems));
        }
    }

    addItemToCart(item: CartItem) {
        const cartItems = this.cartItemsSubject.value;
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        if (!existingItem) {
            const updatedCartItems = [...cartItems, item];
            this.updateCartItems(updatedCartItems);
        }
    }

    removeItemFromCart(itemId: string) {
        const cartItems = this.cartItemsSubject.value;
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        this.updateCartItems(updatedCartItems);
    }

    updateCartItem(updatedItem: CartItem) {
        const cartItems = this.cartItemsSubject.value;
        const index = cartItems.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
            cartItems[index] = updatedItem;
            this.updateCartItems(cartItems);
        }
    }

    private updateCartItems(items: CartItem[]) {
        localStorage.setItem('cart', JSON.stringify(items));
        this.cartItemsSubject.next(items);
    }

    clearCart() {
        localStorage.removeItem('cart');
        this.cartItemsSubject.next([]);
    }
}
