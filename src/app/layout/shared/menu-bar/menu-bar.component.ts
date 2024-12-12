import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { MenuCategory } from '../../../models/menu-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit{

  @Input() categories: MenuCategory[] = [];
  @Input() selectedCategory: string = ''; 
  @Output() categorySelected = new EventEmitter<string>();
  isSticky: boolean = false;
  headerHeight: number = 60; // Adjust this to your header's height
  //selectedCategory = '';

  ngOnInit(): void {}  

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const menuBar = document.querySelector('.menu-bar-container');
    if (window.scrollY > this.headerHeight ) {
      if (!this.isSticky) {
        this.isSticky = true;
        menuBar?.classList.add('sticky'); // Adds sticky class
      }
    } else {
      if (this.isSticky) {
        this.isSticky = false;
        menuBar?.classList.remove('sticky'); // Remove sticky class when scrolled back up
      }
    }
  }

  // Function to select a new category and reset sticky state
  selectCategory(category: string) {
    // Reset sticky state when category is changed
    this.isSticky = false;
    this.selectedCategory = category;
    console.log('Category selected in menu bar:', category);
    this.categorySelected.emit(category);

    // Force a reflow to apply the changes immediately
    setTimeout(() => {
      // Reset any previous scroll position that may cause the sticky behavior
      window.scrollTo(0, 0);  // Optional: Scroll to top on category switch (if you want to reset the scroll position)
    }, 0);
  }
}
