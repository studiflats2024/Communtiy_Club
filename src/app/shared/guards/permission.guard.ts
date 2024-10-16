import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredPermission = route.data['permission'];
    const hasAccess = this.authService.hasPermission(requiredPermission);

    if (hasAccess) {
      return true;
    } else {
      this.router.navigate(['/no-access']);
      return false;
    }
  }
}



/////its route if that guard is used

// const routes: Routes = [
//   {
//     path: 'admin-dashboard',
//     component: AdminDashboardComponent,
//     canActivate: [AdminGuard], ** Super admin access only
//   },
//   {
//     path: 'user-management',
//     component: UserManagementComponent,
//     canActivate: [PermissionGuard],
//     data: { permission: 'manage_users' }, ** Requires 'manage_users' permission
//   },
//   {
//     path: 'no-access',
//     component: NoAccessComponent, **A component to show when the user doesn't have access
//   },
//   {
//     path: 'login',
//     component: LoginComponent,
//   },
//   { path: '**', redirectTo: 'login' },
// ];
