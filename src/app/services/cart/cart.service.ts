import { Injectable } from '@angular/core';
import { MenuItem } from '../../models/menu-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cartItems: MenuItem[] = [];
  private cartItemsSubject = new BehaviorSubject<MenuItem[]>(this.cartItems);

  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(item: MenuItem) {
    const existingItem = this.cartItems.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ ...item, quantity: item.quantity || 1 });
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(item: MenuItem) {
    const index = this.cartItems.findIndex(i => i.name === item.name);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  updateQuantity(item: MenuItem, quantity: number) {
    const cartItem = this.cartItems.find(i => i.name === item.name);
    if (cartItem) {
      cartItem.quantity = quantity;
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
