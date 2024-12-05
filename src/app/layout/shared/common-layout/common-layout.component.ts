import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-common-layout',
  standalone: true,
  imports: [HeaderComponent, CommonModule, SidebarComponent, RouterModule],
  templateUrl: './common-layout.component.html',
  styleUrl: './common-layout.component.css'
})
export class CommonLayoutComponent {

  constructor(private router:Router) {}
  
  isOpen = false;  // Flag to control sidebar visibility

  // Function to toggle the sidebar
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

}
