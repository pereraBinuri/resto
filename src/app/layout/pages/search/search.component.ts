import { Component } from '@angular/core';
import { MenuItem } from '../../../models/menu-item.model';
import { PosService } from '../../../services/pos/pos.service';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from "../../shared/menu-list/menu-list.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MenuListComponent, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchQuery: string = '';  // For binding to the search input field
  menuItems: MenuItem[] = [];  // To store all the menu items
  filteredItems: MenuItem[] = [];  // To store filtered menu items based on the search query

  constructor(private posService: PosService) {}

  ngOnInit() {
    this.loadMenuItems();
  }

  // Fetch all menu items from the service
  loadMenuItems() {
    this.posService.getMenu().subscribe({
      next: (categories) => {
        // Flatten the categories to get all items
        const allItems = categories.flatMap(category => category.items);
        this.menuItems = allItems;
        this.filteredItems = allItems;  // Initially display all items
      },
      error: (err) => {
        console.error('Error fetching menu items:', err);
      }
    });
  }

  // Filter menu items based on the search query
  onSearch() {
    const query = this.searchQuery.toLowerCase();
    this.filteredItems = this.menuItems.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  }
}
