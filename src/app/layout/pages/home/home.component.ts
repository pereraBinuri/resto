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
    this.posService.getMenu().subscribe(
      categories => {
        this.categories = categories; // Use the parsed categories directly
        if (this.categories.length > 0) {
          this.selectedCategory = this.categories[0].name;
          console.log('Default selected category:', this.selectedCategory);
          this.updateMenuItems(); // Initialize menuItems when categories are loaded
        }
      },
      error => {
        console.error('Error fetching menu:', error);
      }
    );
  }
  

  private mapCategories(data: Record<string, any[]>): MenuCategory[] {
    const categories: MenuCategory[] = [];
    for (const categoryName in data) {
      if (data.hasOwnProperty(categoryName)) {
        const items = data[categoryName];
        const category: MenuCategory = {
          name: categoryName,
          items: items.map(item => ({
            id: item.id,
            name: item.title,
            description: item.description || '',
            price: parseFloat(item.price || '0'),
            imageUrl: item.image_url || '',
            images: item.images || [],
            category: categoryName
          })),
        };
        categories.push(category);
      }
    }
    return categories;
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
