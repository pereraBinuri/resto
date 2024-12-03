import { Routes } from '@angular/router';
import { RegisterComponent } from './layout/pages/register/register.component';
import { HomeComponent } from './layout/pages/home/home.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home if no path is matched
    { path: 'home', component: HomeComponent }
];
