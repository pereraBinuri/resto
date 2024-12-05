import { Injectable } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { MenuCategory, MenuItem } from '../../models/menu-item.model';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PosService {

  private posServiceBaseUrl = 'https://pos-dev.delivergate.com/api/v1/webshop';

  constructor(private apiService: ApiService) {}

  getMenu(): Observable<MenuCategory[]> {
    return this.apiService.get<any>(`${this.posServiceBaseUrl}/main-menu/36/categories/webshop-brand/1/shop/2`).pipe(
      map(response => {
        console.log('API response:', response);
  
        // Ensure 'data' exists and is a valid object
        if (response && response.data && typeof response.data === 'object') {
          return Object.keys(response.data).map(category => ({
            name: category,
            items: response.data[category].map((item: any) => ({
              id: item.id,
              name: item.title,
              description: item.description || '',
              price: parseFloat(item.price || '0'),
              imageUrl: item.image_url || '',
              images: item.images || [],
              category: category
            }))
          }));
        } else {
          console.error('Unexpected API response structure:', response);
          return [];
        }
      })
    );
  }
  
}
