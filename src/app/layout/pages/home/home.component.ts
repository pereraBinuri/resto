import { Component } from '@angular/core';
import { PosService } from '../../../services/pos/pos.service';
import { MenuCategory, MenuItem } from '../../../models/menu-item.model';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';
import { MenuListComponent } from '../../shared/menu-list/menu-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuBarComponent, MenuListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  categories: MenuCategory[] = [];
  selectedCategory: string = '';
  menuItems: MenuItem[] = [];

  constructor(private posService: PosService) {}

  ngOnInit() {
    this.posService.getMenu().subscribe(categories => {
      this.categories = categories;
      if (categories.length > 0) {
        this.selectedCategory = categories[0].name;
        console.log('Default selected category:', this.selectedCategory);
        this.updateMenuItems(); // Initialize menuItems when categories are loaded
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
}
