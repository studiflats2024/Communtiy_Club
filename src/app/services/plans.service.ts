import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  private baseUrl: string = '/api/Plans'; // Base URL of the API

  constructor(private http: HttpClient) {}

  /**
   * Fetch all plans
   * @returns Observable<any>
   */
  getPlans(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Plans/GetPlans`).pipe(
      catchError(this.handleError) // Handle errors if any
    );
  }

  /**
   * Error handling
   * @param error HttpErrorResponse
   * @returns Observable with error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }



    /**
   * Add a new plan
   * @param planData - Object containing the plan details
   * @returns Observable<any>
   */
    addNewPlan(planData: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${environment.apiUrl}/Plans/AddNewPlan`, planData, { headers });
      }
}
