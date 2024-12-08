import { Injectable } from '@angular/core';
import { MenuItem } from '../../models/menu-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private _cartItems: MenuItem[] = [];
  private cartItemsSubject = new BehaviorSubject<MenuItem[]>(this._cartItems);

  cartItems$ = this.cartItemsSubject.asObservable();

  get cartItems(): MenuItem[] {
    return this.cartItemsSubject.value;
  }

  addToCart(item: MenuItem) {
    const existingItem = this._cartItems.find(i => i.name === item.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this._cartItems.push({ ...item, quantity: item.quantity || 1 });
    }
    this.cartItemsSubject.next(this._cartItems);
  }

  removeFromCart(item: MenuItem) {
    const index = this._cartItems.findIndex(i => i.name === item.name);
    if (index > -1) {
      this._cartItems.splice(index, 1);
      this.cartItemsSubject.next(this._cartItems);
    }
  }

  updateQuantity(item: MenuItem, quantity: number) {
    const cartItem = this._cartItems.find(i => i.name === item.name);
    if (cartItem) {
      cartItem.quantity = quantity;
      this.cartItemsSubject.next(this._cartItems);
    }
  }

  getTotalPrice(): number {
    return this._cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getTotalItemsCount(): number {
    return this._cartItems.reduce((count, item) => count + item.quantity, 0);
  }
}
