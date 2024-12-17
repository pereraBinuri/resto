import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuListComponent } from './menu-list.component';
import { MenuItem } from '../../../models/menu-item.model';
import { By } from '@angular/platform-browser';

describe('MenuListComponent', () => {
  let component: MenuListComponent;
  let fixture: ComponentFixture<MenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass the correct menu item data to app-menu-item', () => {
    const mockMenuItems: MenuItem[] = [
      { id: 1, name: 'Test Item', description: 'Test Description', price: 20, imageUrl: '', images: [], category: '', quantity: 1 },
    ];
    component.menuItems = mockMenuItems;
    fixture.detectChanges();
  
    const menuItemComponent = fixture.debugElement.queryAll(By.css('app-menu-item'))[0].componentInstance;
    expect(menuItemComponent.menuItem).toEqual(mockMenuItems[0]);
  });
  
});
