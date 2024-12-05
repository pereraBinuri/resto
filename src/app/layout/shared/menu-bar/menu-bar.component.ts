import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuCategory } from '../../../models/menu-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  @Input() categories: MenuCategory[] = [];
  @Output() categorySelected = new EventEmitter<string>();
  selectedCategory = '';

  selectCategory(category: string) {
    this.selectedCategory = category;
    console.log('Category selected in menu bar:', category);
    this.categorySelected.emit(category);
  }
}
