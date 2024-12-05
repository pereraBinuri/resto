import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Login } from '../../models/login.model';
import { Register } from '../../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userServiceBaseUrl = 'https://user-dev.delivergate.com/api/v1/webshop_customer';

  constructor(private apiService: ApiService) {}

  // Register a user
  register(registerData: Register): Observable<any> {
    return this.apiService.post(`${this.userServiceBaseUrl}/register`, registerData);
  }

  // Login a user
  login(loginData: Login): Observable<any> {
    
    return this.apiService.post(`${this.userServiceBaseUrl}/login`, loginData);
  }

  // Store token after successful login
  setAuthToken(token: string) {
    localStorage.setItem('authToken', token);  // Store token in localStorage
  }

   // Retrieve token
   getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Remove token during logout
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Check if the user is logged in by checking token existence
  isLoggedIn(): boolean {
    return this.getAuthToken() !== null;
  }
}
