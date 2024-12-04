import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/shared/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Register } from '../../../models/register.model';
import { state } from '@angular/animations';
import { UserService } from '../../../services/user/user.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;  // Declare the formGroup here

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
      country_code: ['', Validators.required],
      contact_number: ['', [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/)]],
      type: ['WEBSHOP', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
}
