import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/shared/auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Register } from '../../../models/register.model';
import { state } from '@angular/animations';
import { UserService } from '../../../services/user/user.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { strictEmailValidator } from '../../../helpers/validators/strict-email.validator';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, NgSelectModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None, // Disables encapsulation
})
export class RegisterComponent {

  registerForm: FormGroup;  // Declare the formGroup here
  submitted = false; // Initialize the `submitted` variable
  isSpinnerActive: boolean = false; // Local spinner state

  // List of country codes
  countryCodes = [
    { code: '+1', country: 'USA' },
    { code: '+91', country: 'India' },
    { code: '+44', country: 'UK' },
    { code: '+94', country: 'Sri Lanka' },
    { code: '+61', country: 'Australia' },
  ];

  //selectedCountryCode: string = '';


  constructor(
    private formBuilder: FormBuilder,  // Inject FormBuilder into the constructor
    private authenticationService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    // Initialize the form inside the constructor to avoid using the uninitialized 'formBuilder'
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      //address: [''],
      //country_code: ['', Validators.required],
      country_code: [this.countryCodes[0].code, Validators.required], // Default to the first country code
      contact_number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      type: ['WEBSHOP', Validators.required],
      email: ['', [Validators.required, strictEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      account_brand: ['1'],
      //subscribe_to_promotion_emails: [false],
    });
  }

  onSubmit() {
    this.submitted = true; // Mark the form as submitted
    if (this.registerForm.valid) {
      this.isSpinnerActive = true; // Set local spinner state
      const registerData: Register = this.registerForm.value;

      this.authenticationService.register(registerData).subscribe(
        response => {
          this.isSpinnerActive = false; // Reset spinner state
          console.log('Registration successful:', response);
          //alert('Registration successful! Redirecting to login page.');
          // Store email and password in UserService
          //this.userService.setUserCredentials(registerData.email, registerData.password);

          // Navigate to login page
          this.router.navigate(['/login']);
        },
        error => {
          this.isSpinnerActive = false; // Reset spinner state
          console.error('Registration failed:', error);
          if (error.status === 400 && error.error) {
            const backendError = error.error;
  
            // Dynamically handle backend errors based on `data.property`
            if (backendError.data?.property === 'email') {
              this.registerForm.get('email')?.setErrors({ backend: backendError.message });
            } else if (backendError.data?.property === 'contact_number') {
              this.registerForm.get('contact_number')?.setErrors({ backend: backendError.message });
            }
          } else {
            console.error('Unexpected error format:', error);
          }
        }
      );
    } else {
    // Mark all controls as touched to trigger validation messages
    this.registerForm.markAllAsTouched();
  }
  }

  hasErrors(): boolean {
    return (
      !!this.registerForm.get('email')?.hasError('backend') || 
      !!this.registerForm.get('contact_number')?.hasError('backend')
    );
  }
  

  // Handle ngModel change (this updates the form control as well)
  //onCountryCodeChange(selectedValue: any) {
  //this.selectedCountryCode = selectedValue;
  // If you're using Reactive Forms, you can also update the form control here
  //this.registerForm.get('country_code')?.setValue(selectedValue);
  //}
}
