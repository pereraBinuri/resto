import { Injectable } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serviceType: 'user' = 'user'; // Define the service type for user service
  private userCredentials: { email?: string; password?: string } = {}; // Temporary storage

  constructor(private apiService: ApiService) {}

  // Store user credentials
  setUserCredentials(email: string, password: string): void {
    this.userCredentials = { email, password };
  }

  // Retrieve user credentials
  getUserCredentials(): { email?: string; password?: string } {
    return this.userCredentials;
  }

  // Fetch user data by ID
  getUserData(userId: string): Observable<any> {
    const endpoint = `/webshop_customer/profile/${userId}`; // Endpoint for user profile
    return this.apiService.get(this.serviceType, endpoint);
  }
}
