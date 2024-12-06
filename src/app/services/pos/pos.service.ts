import { Injectable } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { MenuCategory, MenuItem } from '../../models/menu-item.model';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PosService {

  private serviceType: 'menu' = 'menu'; // Define the service type for menu service

  constructor(private apiService: ApiService) {}

  // Fetch menu categories and items
  getMenu(): Observable<MenuCategory[]> {
    const endpoint = '/webshop/main-menu/36/categories/webshop-brand/1/shop/2'; // Endpoint specific to the menu service
    return this.apiService.get<any>(this.serviceType, endpoint).pipe(
      map((response) => {
        console.log('API response:', response);

        // Ensure 'data' exists and is a valid object
        if (response && response.data && typeof response.data === 'object') {
          return Object.keys(response.data).map((category) => ({
            name: category,
            items: response.data[category].map((item: any) => ({
              id: item.id,
              name: item.title,
              description: item.description || '',
              price: parseFloat(item.price || '0'),
              imageUrl: item.image_url || '',
              images: item.images || [],
              category: category,
            })),
          }));
        } else {
          console.error('Unexpected API response structure:', response);
          return [];
        }
      })
    );
  }
  
}
