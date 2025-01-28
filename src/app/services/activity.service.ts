import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

 

  constructor(private http: HttpClient) {}
  token: any = localStorage.getItem('tokenKey');

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`,
  });

 


  /////////////////////////////////////////// add activities section///////////////////////////////////////////
 

  uploadImage(file: File) {
    const url = `${environment.apiUrl}/Basics/UploadSingleFile`;

      const formData = new FormData();
      formData.append('fileData', file);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('tokenKey')}` // If authentication is required
      });

      return this.http.post(url, formData, { headers });
    }

    addNewCourse(courseData: any): Observable<any> {
        const url = `${environment.apiUrl}/Courses/AddNewCourse`;
        return this.http.post(url, courseData);
      }
 

      addNewWorkshop(workshopData: any): Observable<any> {
        const url = `${environment.apiUrl}/Workshops/AddNewWorkshop`;

        return this.http.post<any>(url, workshopData);
      }

      addNewEvent(eventData: any): Observable<any> {
        const url = `${environment.apiUrl}/Events`;

        return this.http.post(`${url}/AddNewEvent`, eventData);
      }

      addNewConsult(consultData: any): Observable<any> {
        const url = `${environment.apiUrl}/Consults/AddNewConsult`;
        return this.http.post<any>(url, consultData);
      }
  
}
