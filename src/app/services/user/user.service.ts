import { Injectable } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userServiceBaseUrl = 'https://user-dev.delivergate.com/api/v1/webshop_customer';

  constructor(private apiService: ApiService) {}

  // Example of fetching user data
  getUserData(userId: string) {
    return this.apiService.get(`${this.userServiceBaseUrl}/profile/${userId}`);
  }
}
