import { Routes } from '@angular/router';
import { AdminGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'workers-requests',
    loadComponent: () => import('./components/workers/requests-list/requests-list.component').then(m => m.RequestsListComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'worker-details/:id',
    loadComponent: () => import('./components/workers/worker-details/worker-details.component').then(m => m.WorkerDetailsComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AdminGuard]
  },

  { path: '**', redirectTo: 'login' },
];
