import { Routes } from '@angular/router';
import { RegisterComponent } from './layout/pages/register/register.component';
import { HomeComponent } from './layout/pages/home/home.component';
import { LoginComponent } from './layout/login/login/login.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/register', pathMatch: 'full' }, // Redirect to home if no path is matched
    { path: 'home', component: HomeComponent }
];
