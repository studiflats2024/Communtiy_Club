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
    path: 'apartment-list',
    loadComponent: () => import('./components/apartment/apartment-list/apartment-list.component').then(m => m.ApartmentListComponent),
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
  {
    path: 'staff-list',
    loadComponent: () => import('./components/staff/staff-list/staff-list.component').then(m => m.StaffListComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'staff-jobs/:id',
    loadComponent: () => import('./components/staff/staff-assigned-job/staff-assigned-job.component').then(m => m.StaffAssignedJobComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'staff-details/:id',
    loadComponent: () => import('./components/staff/staff-details/staff-details.component').then(m => m.StaffDetailsComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'issues-list',
    loadComponent: () => import('./components/issues/issues-list/issues-list.component').then(m => m.IssuesListComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'create-issue',
    loadComponent: () => import('./components/issues/create-issue/create-issue.component').then(m => m.CreateIssueComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'create-staff',
    loadComponent: () => import('./components/staff/create-staff/create-staff.component').then(m => m.CreateStaffComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'update-staff/:id',
    loadComponent: () => import('./components/staff/update-staff/update-staff.component').then(m => m.UpdateStaffComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'issue-details/:id',
    loadComponent: () => import('./components/issues/issue-details/issue-details.component').then(m => m.IssueDetailsComponent),
    canActivate: [AdminGuard]
  },
  {
    path: 'update-issue/:id',
    loadComponent: () => import('./components/issues/update-issue/update-issue.component').then(m => m.UpdateIssueComponent),
    canActivate: [AdminGuard]
  },


  { path: '**', redirectTo: 'login' },
];
