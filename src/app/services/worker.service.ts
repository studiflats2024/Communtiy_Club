import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root', // This makes the service available throughout the app
})
export class WorkerService {


  constructor(private http: HttpClient) {}

  getAllWorkerRequests(page_NO: number, page_Size: number, search_Key: string): Observable<any> {
    const url = `${environment.apiUrl}/WokersStaff/Get_AllWorker_Requests`;

    const params = {
      Page_NO: page_NO,
      Page_Size: page_Size,
      Search_Key: search_Key
    };
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(url, {params,headers});
  }

  updateProfileStatus(profile_ID: string, profile_Action: string, additional_Data: string): Observable<any> {
    const url = `${environment.apiUrl}/WokersStaff/Profile_Status_Update`;

    const body = {
      profile_ID: profile_ID,
      profile_Action: profile_Action,
      additional_Data: additional_Data,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your token here if required
    });

    return this.http.post<any>(url, body, { headers });
  }

  getProfile(profile_ID: string): Observable<any> {
    const url = `${environment.apiUrl}/WokersStaff/GetProfile_InDetails`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure the token is stored in local storage
    });

    return this.http.get<any>( url, {
      headers,
      params: { profile_ID }
    });
  }
}
