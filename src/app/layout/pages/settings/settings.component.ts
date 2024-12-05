import { Component } from '@angular/core';
import { AuthService } from '../../../services/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  constructor(private authService: AuthService, private router: Router) {}

  // Method to handle logout
  logout(): void {
    this.authService.logout(); // Clear the token
    this.router.navigate(['/login']);  // Redirect to login page after logout
    //window.location.href = '/login';
  }
}
