import { Routes } from '@angular/router';
import { AdminGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
 
  {
    path: '',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'manage-subscription',
    loadComponent: () => import('./components/manage-subscription/manage-subscription.component').then(m => m.ManageSubscriptionComponent),
    canActivate: [AdminGuard]
  },
 
 
  
   


  { path: '**', redirectTo: 'login' },
];
