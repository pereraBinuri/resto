import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBarComponent } from './menu-bar.component';
import { MenuCategory } from '../../../models/menu-item.model';

describe('MenuBarComponent', () => {
  let component: MenuBarComponent;
  let fixture: ComponentFixture<MenuBarComponent>;

  const mockCategories: MenuCategory[] = [
    { name: 'Category 1', items: [] },
    { name: 'Category 2', items: [] },
  ];
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the selected category', () => {
    spyOn(component.categorySelected, 'emit');
    const category = 'Test Category';
    component.selectCategory(category);
    expect(component.categorySelected.emit).toHaveBeenCalledWith(category);
  });

  it('should update selectedCategory when a category is selected', () => {
    const category = 'Test Category';
    component.selectCategory(category);
    expect(component.selectedCategory).toBe(category);
  });

  it('should highlight the selected category button', () => {
    component.categories = mockCategories;
    component.selectedCategory = 'Category 1';
    fixture.detectChanges();
    const activeButton = fixture.nativeElement.querySelector('.menu-bar button.active');
    expect(activeButton).toBeTruthy();
    expect(activeButton.textContent.trim()).toBe('Category 1');
  });
  
  
});
