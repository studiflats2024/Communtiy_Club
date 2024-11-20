import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {



  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    const apiUrl = 'https://restcountries.com/v3.1/all';
    return this.http.get<any>(apiUrl);
  }


  getAllStaff(pageNo: number, pageSize: number): Observable<any> {
    const url = `${environment.apiUrl}/WokersStaff/GetAllStaff?Page_No=${pageNo}&Page_Size=${pageSize}`;
    const headers = new HttpHeaders({
      'accept': 'text/plain',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get<any>(url, { headers });
  }

  addNewSkill(newSkill: string): Observable<any> {
    const url = `${environment.apiUrl}/WokersStaff/AddNewSkills?New_Skill=${newSkill}`;

    // Define headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Specify the type of content being sent
      Authorization: `Bearer ${localStorage.getItem('token')}` // Example of adding an Authorization header
    });

    // Send the request with headers
    return this.http.post<any>(url, {}, { headers });
  }
}
