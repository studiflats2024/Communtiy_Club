import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(localStorage.getItem('user'));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    const url = `${environment.apiUrl}/Admin/Login`;
    const params = {
      UserMail: username,
      Password: password
    };
    return this.http.post<any>(url, null, { params }).pipe(
      map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', user.token);
        this.userSubject.next(user);
        return user;
      })
    );
  }



  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const user = this.userValue;
    if (!token || !user) return false;

    const expirationDate = new Date(user.expire_token);
    if (new Date() > expirationDate) {
      this.logout();
      return false;
    }

    return true;
  }

  hasPermission(permission: string): boolean {
    const user = this.userValue;
    return user?.permissions?.includes(permission);
  }

  isSuperAdmin(): boolean {
    const user = this.userValue;
    return user?.is_Super;
  }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token');
  // }

  // hasPermission(role: string): boolean {
  //   const user = this.userValue;
  //   return user?.role === role;
  // }
  // hasPermission(permission: string): boolean {
  //   const user = this.userValue;
  //   return user?.permissions.includes(permission);
  // }

  // isSuperAdmin(): boolean {
  //   const user = this.userValue;
  //   return user?.is_Super === true;
  // }

  /**
   * Utility function to check token expiration.
   * This method checks if the token expiration date has passed.
   */
  private checkTokenExpiration(user: any): boolean {
    if (!user || !user.expire_token) return true;

    const expireDate = new Date(user.expire_token);
    return expireDate <= new Date();
  }
}
