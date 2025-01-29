import { Routes } from '@angular/router';
import { AdminGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
 
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'manage-subscription',
    loadComponent: () => import('./components/manage-subscription/manage-subscription.component').then(m => m.ManageSubscriptionComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'add-new-plan',
    loadComponent: () => import('./components/add-new-plan/add-new-plan.component').then(m => m.AddNewPlanComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'edit-plan/:id',
    loadComponent: () => import('./components/edit-plan/edit-plan.component').then(m => m.EditPlanComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'activities',
    loadComponent: () => import('./components/activities/activities.component').then(m => m.ActivitiesComponent),
    canActivate: [AdminGuard]
  },

  {
    path: 'add-new-activity',
    loadComponent: () => import('./components/add-new-activity/add-new-activity.component').then(m => m.AddNewActivityComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'update-activity/:id/:type',
    loadComponent: () => import('./components/update-activity/update-activity.component').then(m => m.UpdateActivityComponent),
    canActivate: [AdminGuard]
  },
 
  
   


  { path: '**', redirectTo: 'login' },
];
