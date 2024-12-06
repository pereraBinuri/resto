import { Component, EventEmitter, Output } from '@angular/core';
import { MenuItem } from '../../../models/menu-item.model';
import { CartService } from '../../../services/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent {

  @Output() close = new EventEmitter<void>();
  cartItems: MenuItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  // Add any necessary cart-related logic here (e.g., cart items, etc.)

  onClose() {
    this.close.emit();  // Emit event to close the modal
  }

  updateQuantity(item: MenuItem, increase: boolean) {
    const newQuantity = increase ? item.quantity + 1 : item.quantity - 1;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(item, newQuantity);
    }
  }

  removeItem(item: MenuItem) {
    this.cartService.removeFromCart(item);
  }

}
