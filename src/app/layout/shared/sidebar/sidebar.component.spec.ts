import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply "open" class when isOpen is true', () => {
    component.isOpen = true;
    fixture.detectChanges();
  
    const sidebarElement: HTMLElement = fixture.nativeElement.querySelector('.sidebar');
    expect(sidebarElement.classList).toContain('open');
  });
  
  it('should not apply "open" class when isOpen is false', () => {
    component.isOpen = false;
    fixture.detectChanges();
  
    const sidebarElement: HTMLElement = fixture.nativeElement.querySelector('.sidebar');
    expect(sidebarElement.classList).not.toContain('open');
  });

  it('should close the sidebar when a navigation link is clicked', () => {
    component.isOpen = true;
    fixture.detectChanges();
  
    const navLink: HTMLElement = fixture.nativeElement.querySelector('a[routerLink="/home"]');
    navLink.click();
    fixture.detectChanges();
  
    expect(component.isOpen).toBeFalse();
  });

  it('should close the sidebar when close button is clicked', () => {
    component.isOpen = true;
    fixture.detectChanges();
  
    const closeButton: HTMLElement = fixture.nativeElement.querySelector('.close-btn');
    closeButton.click();
    fixture.detectChanges();
  
    expect(component.isOpen).toBeFalse();
  });
  
  it('should toggle sidebar when sidebarToggle event is emitted from HeaderComponent', () => {
    const headerElement = fixture.nativeElement.querySelector('app-header');
    headerElement.dispatchEvent(new CustomEvent('sidebarToggle'));
    fixture.detectChanges();
  
    expect(component.isOpen).toBeTrue();
  });
  
});
