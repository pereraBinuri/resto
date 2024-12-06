import { Component, Input } from '@angular/core';
import { MenuItem } from '../../../models/menu-item.model';
import { CommonModule } from '@angular/common';
import { ItemModalComponent } from '../item-modal/item-modal.component';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule, ItemModalComponent],
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {

  @Input() menuItem!: MenuItem;
  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }
}
