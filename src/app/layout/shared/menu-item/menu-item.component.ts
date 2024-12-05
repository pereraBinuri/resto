import { Component, Input } from '@angular/core';
import { MenuItem } from '../../../models/menu-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})
export class MenuItemComponent {

  @Input() menuItem!: MenuItem;
}
