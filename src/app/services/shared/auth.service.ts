import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userServiceBaseUrl = 'https://user-dev.delivergate.com/api/v1/webshop_customer';

  constructor(private apiService: ApiService) {}

  // Register a user
  register(registerForm: any): Observable<any> {
    return this.apiService.post(`${this.userServiceBaseUrl}/register`, registerForm);
  }

  // Login a user
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.apiService.post(`${this.userServiceBaseUrl}/login`, loginData);
  }
}
