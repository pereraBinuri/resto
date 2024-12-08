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
      contact_number: ['', [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/)]],
      type: ['WEBSHOP', Validators.required],
      email: ['', [Validators.required, strictEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      account_brand: ['1'],
      //subscribe_to_promotion_emails: [false],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerData: Register = this.registerForm.value;

      this.authenticationService.register(registerData).subscribe(
        response => {
          console.log('Registration successful:', response);
          //alert('Registration successful! Redirecting to login page.');
          // Store email and password in UserService
          //this.userService.setUserCredentials(registerData.email, registerData.password);

          // Navigate to login page
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        }
      );
    }
  }

  // Handle ngModel change (this updates the form control as well)
  //onCountryCodeChange(selectedValue: any) {
    //this.selectedCountryCode = selectedValue;
    // If you're using Reactive Forms, you can also update the form control here
    //this.registerForm.get('country_code')?.setValue(selectedValue);
  //}
}
