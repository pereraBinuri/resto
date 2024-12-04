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
}
