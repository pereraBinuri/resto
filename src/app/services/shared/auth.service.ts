import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Login } from '../../models/login.model';
import { Register } from '../../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serviceType: 'user' = 'user'; // Define the service type for user service

  constructor(private apiService: ApiService) {}

  // Register a user
  register(registerData: Register): Observable<any> {
    const endpoint = '/webshop_customer/register'; // Endpoint specific to the user service
    return this.apiService.post(this.serviceType, endpoint, registerData);
  }

  // Login a user
  login(loginData: Login): Observable<any> {
    const endpoint = '/webshop_customer/login'; // Endpoint specific to the user service
    return this.apiService.post(this.serviceType, endpoint, loginData);
  }

  // Store token after successful login
  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token); // Store token in localStorage
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
