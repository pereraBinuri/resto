import { Injectable } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class PosService {

  private posServiceBaseUrl = 'https://pos-dev.delivergate.com/api/v1';

  constructor(private apiService: ApiService) {}

  // Example of fetching POS data
  getPosData() {
    return this.apiService.get(`${this.posServiceBaseUrl}/menu`);
  }
}
