import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemModalComponent } from './item-modal.component';
import { MenuItem } from '../../../models/menu-item.model';
import { CartService } from '../../../services/cart/cart.service';

describe('ItemModalComponent', () => {
  let component: ItemModalComponent;
  let fixture: ComponentFixture<ItemModalComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemModalComponent],
      providers: [CartService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ItemModalComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);

    // Initialize the menuItem input with a sample object
    component.menuItem = {
      id: 1,
      name: 'Test Item',
      description: 'Test item description',
      price: 100,
      imageUrl: '',
      images: [],  // Can keep it empty for the test case
      category: 'Test Category',
      quantity: 1  // Initialize quantity to avoid undefined errors
    } as MenuItem;

    // Trigger change detection to reflect changes
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the modal when showModal is true', () => {
    component.showModal = true;
    fixture.detectChanges();
    const modal = fixture.nativeElement.querySelector('.modal');
    expect(modal).toBeTruthy();
  });

  it('should hide the modal when showModal is false', () => {
    component.showModal = false;
    fixture.detectChanges();
    const modal = fixture.nativeElement.querySelector('.modal');
    expect(modal).toBeNull();
  });

  it('should update the quantity when the + or - button is clicked', () => {
    // Ensure menuItem has all properties, especially quantity
    component.menuItem = { ...component.menuItem, quantity: 1 };
    component.showModal = true;  // Make sure modal is displayed
    fixture.detectChanges();

    // Get the increment button by its class
    const incrementButton = fixture.nativeElement.querySelector('.increment-btn');
    expect(incrementButton).toBeTruthy();  // Ensure the button is found

    // Check the initial quantity displayed in the modal
    //const quantityDisplayBefore = fixture.nativeElement.querySelector('.quantity-control span').textContent;
    //expect(quantityDisplayBefore).toBe('1');

    incrementButton.click();
    fixture.detectChanges();

    // Check the quantity after the button click
    const quantityDisplayAfterIncrease = fixture.nativeElement.querySelector('.quantity-control span').textContent;
    expect(quantityDisplayAfterIncrease).toBe('2');  // Assert quantity was updated

    // Get the decrement button by its class
    const decrementButton = fixture.nativeElement.querySelector('.decrement-btn');
    expect(incrementButton).toBeTruthy();  // Ensure the button is found

    decrementButton.click();
    fixture.detectChanges();

    // Check the quantity after the button click
    const quantityDisplayAfterDecrease = fixture.nativeElement.querySelector('.quantity-control span').textContent;
    expect(quantityDisplayAfterDecrease).toBe('1');  // Assert quantity was updated
  });

  it('should not decrease the quantity below 1 when the - button is clicked', () => {
    component.menuItem = { ...component.menuItem, quantity: 1 };
    component.showModal = true;  // Make sure modal is displayed
    fixture.detectChanges();

    const decrementButton = fixture.nativeElement.querySelector('.decrement-btn');
    decrementButton.click();
    fixture.detectChanges();

    expect(component.menuItem.quantity).toBe(1);
  });

  it('should calculate the subtotal correctly', () => {
    component.menuItem.price = 100;
    component.menuItem.quantity = 2;

    // When: The getSubtotal method is called
    const subtotal = component.getSubtotal();

    // Then: The subtotal should be the product of price and quantity (100 * 2 = 200)
    expect(subtotal).toBe(200);
  });

  it('It should add items to the cart when addCart is called', () => {
    const cartServiceSpy = spyOn(cartService, 'addToCart');
    component.menuItem = { ...component.menuItem, quantity: 1 };
    component.showModal = true;  // Make sure modal is displayed
    fixture.detectChanges();

    component.addToCart();
    // Then: The addToCart method of the cartService should have been called
    expect(cartServiceSpy).toHaveBeenCalledWith(component.menuItem);
  });

  it('should reset quantity to 1 when modal is closed', () => {
    // Given: A menuItem with a quantity of 5
    component.menuItem.quantity = 5;
    
    // When: closeModal method is called
    component.closeModal();

    // Then: The quantity should be reset to 1
    expect(component.menuItem.quantity).toBe(1);
  });
});
