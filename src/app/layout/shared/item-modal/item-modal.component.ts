import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../../models/menu-item.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-item-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.css']
})
export class ItemModalComponent {

  @Input() menuItem!: MenuItem;
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();
  cartItems: MenuItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    if (!this.menuItem.quantity) {
      this.menuItem.quantity = 1; // Ensure quantity is initialized to 1
    }
  }

  closeModal() {
    this.close.emit(); // Notify the parent to close the modal
  }

  addToCart() {
    this.cartService.addToCart(this.menuItem);
  }

  changeQuantity(increase: boolean) {
    if (increase) {
      this.menuItem.quantity++;
    } else if (this.menuItem.quantity > 1) {
      this.menuItem.quantity--;
    }

    // Update the quantity in cart service after change (optional, for real-time update)
  this.cartService.updateQuantity(this.menuItem, this.menuItem.quantity); 
  console.log('After change:', this.menuItem.quantity);
  }

}
