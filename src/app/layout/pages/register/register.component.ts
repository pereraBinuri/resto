import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;  // Declare the formGroup here

  constructor(
    private formBuilder: FormBuilder,  // Inject FormBuilder into the constructor
    private authenticationService: AuthService,
    private router: Router
  ) {
    // Initialize the form inside the constructor to avoid using the uninitialized 'formBuilder'
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      address: [''],
      country_code: ['+94', Validators.required],
      contact_number: ['', [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/)]],
      type: ['WEBSHOP', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      account_brand: ['subway'],
      subscribe_to_promotion_emails: [false],
      device_platform: ['web']
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authenticationService.register(this.registerForm.value).subscribe(
        response => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration failed:', error);
        }
      );
    }
  }
}
