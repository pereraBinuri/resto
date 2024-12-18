export class MenuItem {
    id: number = 0;
    name: string = '';
    description: string = '';
    price: number = 0;
    imageUrl: string = ''; 
    images: { group: string, size: string, path: string }[] = []; 
    category: string = '';
    quantity: number = 0;
  }
  
  export class MenuCategory {
    name: string = '';
    items: MenuItem[] = [];
  }