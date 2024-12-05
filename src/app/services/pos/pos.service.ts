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

  getMenu(): Observable<MenuCategory[]> {  // Specify return type
    return this.apiService.get<MenuItem[]>(`${this.posServiceBaseUrl}/main-menu/1/categories/webshop-brand/1/shop/2`).pipe(
      map((response: any) => {
        // Log the whole response to see its structure
        console.log('API response:', response);

        // Check if the response contains a valid 'data' array
        const items: MenuItem[] = response.data || [];
        
        if (!Array.isArray(items)) {
          console.error('Expected an array of items but got:', items);
        }

        const categories = items.reduce((acc, item) => {
          acc[item.category] = acc[item.category] || [];
          acc[item.category].push(item);
          return acc;
        }, {} as Record<string, MenuItem[]>);

        // Log categories to inspect the grouping
        console.log('Grouped categories:', categories);

        return Object.keys(categories).map((category) => ({
          name: category,
          items: categories[category],
        }));
      })
    );
  }
}
