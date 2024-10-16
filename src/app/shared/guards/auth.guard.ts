import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}


  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.authService.isSuperAdmin()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivate2(): boolean {
    if (this.authService.isLoggedIn() ) {  //&& this.authService.hasPermission('admin')
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
