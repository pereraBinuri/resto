import { Routes } from '@angular/router';
import { RegisterComponent } from './layout/pages/register/register.component';
import { HomeComponent } from './layout/pages/home/home.component';
import { LoginComponent } from './layout/login/login/login.component';
import { CommonLayoutComponent } from './layout/shared/common-layout/common-layout.component';
import { SettingsComponent } from './layout/pages/settings/settings.component';
import { SearchComponent } from './layout/pages/search/search.component';
import { authGuard } from './helpers/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect to home if no path is matched
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: CommonLayoutComponent, // Parent layout for sidebar-enabled pages
        canActivate: [authGuard],
        children: [
          { path: 'home', component: HomeComponent },
          { path: 'search', component: SearchComponent },
          { path: 'settings', component: SettingsComponent }
        ]
      },
    { path: '**', redirectTo: 'home' }  // Redirect to login for any unknown route
      
];
