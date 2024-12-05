import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/shared/auth.service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  // If the user is logged in, redirect them to the 'all' page
  if (authService.isLoggedIn()) {
    window.location.href = '/home'; // Redirect to a default route for authenticated users
    return false;
  }
  return true; // Allow access to the login page if not logged in
};
