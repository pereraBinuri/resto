import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/shared/auth.service';
import { Login } from '../../../models/login.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { strictEmailValidator } from '../../../helpers/validators/strict-email.validator';
import { NgxSpinnerService } from 'ngx-spinner'; // Import the spinner service
import { NgxSpinnerModule } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  loginError: string = '';
  submitted: boolean = false;
  isSpinnerActive: boolean = false; // Local spinner state


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {
    // Retrieve stored email and password
    //const credentials = this.userService.getUserCredentials();

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, strictEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Clear loginError on form changes
    this.loginForm.valueChanges.subscribe(() => {
      if (this.loginError) {
        this.loginError = '';
      }
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  // Handle login form submission
  onLogin() {
    this.submitted = true;

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.isSpinnerActive = true; // Set local spinner state
    // Show the spinner before the API call
    this.spinner.show();

    // Prepare the login data object
    const loginData: Login = {
      username: this.f['username'].value,
      password: this.f['password'].value,
      grant_type: environment.GRANT_TYPE,
      client_id: environment.CLIENT_ID,
      client_secret: environment.CLIENT_SECRET,
      scope: '',
      account_brand: 1 // Send account_brand as 1
    };

    // Call the login service
    this.authService.login(loginData).subscribe(
      (response) => {
        this.spinner.hide(); // Hide the spinner when response is received
        this.isSpinnerActive = false; // Reset spinner state
        console.log('Login successful:', response);
        const accessToken = response.accessToken; // Assuming accessToken in the response
        this.authService.setAuthToken(accessToken);
        // Handle successful login (e.g., redirect to dashboard)
        this.router.navigate(['/home']);
      },
      (error) => {
        this.spinner.hide(); // Hide the spinner on error
        this.isSpinnerActive = false; // Reset spinner state
        console.error('Login failed:', error);
        this.loginError = 'Login failed. Please check your credentials.';
      }
    );
  }
  
}