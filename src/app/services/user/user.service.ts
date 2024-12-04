import { Injectable } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userServiceBaseUrl = 'https://user-dev.delivergate.com/api/v1/webshop_customer';
  private userCredentials: { email?: string; password?: string } = {}; // Temporary storage

  constructor(private apiService: ApiService) {}

  // Store user credentials
  setUserCredentials(email: string, password: string) {
    this.userCredentials = { email, password };
  }

  // Retrieve user credentials
  getUserCredentials() {
    return this.userCredentials;
  }
  
  // Example of fetching user data
  getUserData(userId: string) {
    return this.apiService.get(`${this.userServiceBaseUrl}/profile/${userId}`);
  }
}
