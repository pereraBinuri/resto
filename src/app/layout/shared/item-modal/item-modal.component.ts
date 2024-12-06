import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../../models/menu-item.model';
import { CommonModule } from '@angular/common';

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

  closeModal() {
    this.close.emit(); // Notify the parent to close the modal
  }

}
