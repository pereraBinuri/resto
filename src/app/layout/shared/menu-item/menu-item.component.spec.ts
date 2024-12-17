import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemComponent } from './menu-item.component';
//import { PosService } from '../../../services/pos/pos.service';
import { MenuItem } from '../../../models/menu-item.model';
import { By } from '@angular/platform-browser';

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;
  //let posService: jasmine.SpyObj<PosService>;

  const mockMenuItem: MenuItem = {
    id: 1,
    name: 'Test Dish',
    description: 'Delicious test description for the dish.',
    price: 15.99,
    imageUrl: 'https://example.com/test-image.jpg',
    images: [],
    category: 'Test Category',
    quantity: 10
  };
  
  beforeEach(async () => {
    //const posServiceSpy = jasmine.createSpyObj('PosService', ['getMenu']);

    await TestBed.configureTestingModule({
      imports: [MenuItemComponent],
      //providers: [
      //  { provide: PosService, useValue: posServiceSpy }
      //]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    //posService = TestBed.inject(PosService) as jasmine.SpyObj<PosService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the menu item name', () => {
    component.menuItem = mockMenuItem;
    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(nameElement.textContent).toContain(mockMenuItem.name);
  });

  it('should display the menu item price in currency format', () => {
    component.menuItem = mockMenuItem;
    fixture.detectChanges();

    const priceElement = fixture.debugElement.query(By.css('.menu-item-price')).nativeElement;
    expect(priceElement.textContent).toContain('$15.99');
  });

  it('should display the image if imageUrl is provided', () => {
    component.menuItem = mockMenuItem;
    fixture.detectChanges();

    const imageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imageElement.src).toBe(mockMenuItem.imageUrl);
  });

  it('should display the default image if imageUrl is not provided', () => {
    component.menuItem = { ...mockMenuItem, imageUrl: '' };
    fixture.detectChanges();

    const defaultImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(defaultImageElement.src).toContain('https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg');
  });

  it('should truncate description longer than 80 characters', () => {
    component.menuItem = {
      ...mockMenuItem,
      description: 'This is a very long description that exceeds the maximum limit of 80 characters for testing.'
    };
    fixture.detectChanges();

    const descriptionElement = fixture.debugElement.query(By.css('.menu-item-description')).nativeElement;
    expect(descriptionElement.textContent).toContain('This is a very long description that exceeds the maximum lim...');
  });
});
