import { Component, Input } from '@angular/core';
import { MenuItem } from '../../../models/menu-item.model';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, MenuItemComponent],
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent {

  @Input() menuItems: MenuItem[] = [];

  ngOnChanges() {
    console.log('Updated menu items:', this.menuItems);
  }
}
