import { Component } from '@angular/core';
import { PosService } from '../../../services/pos/pos.service';
import { MenuCategory, MenuItem } from '../../../models/menu-item.model';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';
import { MenuListComponent } from '../../shared/menu-list/menu-list.component';
import { CartModalComponent } from '../../shared/cart-modal/cart-modal.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuBarComponent, MenuListComponent, CartModalComponent, CommonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  categories: MenuCategory[] = [];
  selectedCategory: string = '';
  menuItems: MenuItem[] = [];
  isCartModalOpen: boolean = false; // Controls the cart modal visibility
  cartItemCount: number = 0;

  constructor(private posService: PosService, private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItemCount = this.cartService.getTotalItemsCount();
    });
    this.loadCategoriesAndMenuItems();
  }

  loadCategoriesAndMenuItems() {
    this.posService.getMenu().subscribe({
      next: (res: any) => {
        if (res && res.length > 0) {
          this.categories = res; // Assign the categories from the response
          this.selectedCategory = this.categories[0].name; // Set the default selected category
          console.log('Default selected category:', this.selectedCategory);
          this.updateMenuItems(); // Initialize menuItems when categories are loaded
        } else {
          console.log('No categories found.');
        }
      },
      error: (err: any) => {
        console.error('Error fetching menu:', err);
      }
    });
  }  

  onCategorySelected(category: string) {
    console.log('Category selected:', category);
    this.selectedCategory = category;
    this.updateMenuItems(); // Update menuItems based on the selected category
  }

  private updateMenuItems() {
    const selectedCategoryData = this.categories.find(c => c.name === this.selectedCategory);
    //this.menuItems = selectedCategoryData ? selectedCategoryData.items : [];

    if (selectedCategoryData) {
      console.log('Selected category data:', selectedCategoryData);
      this.menuItems = selectedCategoryData.items;
    } else {
      console.error('No items found for category:', this.selectedCategory);
      this.menuItems = [];
    }
  }

  // Method to open the cart modal
  openCartModal() {
    this.isCartModalOpen = true;
  }

  // Method to close the cart modal
  closeCartModal() {
    this.isCartModalOpen = false;
  }
}
