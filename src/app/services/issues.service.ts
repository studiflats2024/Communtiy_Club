import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root', // This makes the service available throughout the app
})
export class IssuesService {


  constructor(private http: HttpClient) {}

  getAllApartments(page_No: number, page_Size: number, searchTerm: string): Observable<any> {
    const url = `${environment.apiUrl}/WokersStaff/GetApartments_List`;

    const params = {
      Page_No: page_No.toString(), // Ensuring parameters are strings
      Page_Size: page_Size.toString(),
      searchTerm: searchTerm
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(url, { params, headers });
  }




  getIssueCode(): Observable<string> {
    const url = `${environment.apiUrl}/WokersStaff/GetIssue_Code`;

    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    const headers = new HttpHeaders({
      'accept': 'text/plain',
      'Authorization': `Bearer ${token}`
    });

    // Setting responseType to 'text' and returning the observable directly
    return this.http.get(url, { headers, responseType: 'text' }) as Observable<string>;
  }


  createNewIssue(data: any): Observable<any> {
    const url = `${environment.apiUrl}/WokersStaff/CreateNewIssue_Dashboard`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(url, data, { headers });
  }

  updateIssue(issueData: any): Observable<any> {
    const url = `${environment.apiUrl}/WokersStaff/UpdateIssue_Dashboard`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.post(url, issueData,{ headers });
  }


  getIssueDetails(issueId: string): Observable<any> {
    const url = `${environment.apiUrl}/WokersStaff/GetIssue_Details_Dashbaord`;
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    const headers = new HttpHeaders({
      'accept': 'text/plain', // Accept header as specified in your example
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${url}?Issue_ID=${issueId}`, { headers });
  }

    // Method to get all skills
    getIssueTypes(): Observable<any> {
    const url = `${environment.apiUrl}/WokersStaff/GetAllSkills`;

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'text/plain' // Adjust this if the server returns JSON or other content types
      });

      return this.http.get<any>(url, { headers });
    }


    getAllIssues(pageNo?: number, pageSize?: number): Observable<any> {
    const url = `${environment.apiUrl}/WokersStaff/GetAllIssues_Dashboard`;

      let params = new HttpParams();

      // Add parameters only if they are provided
      if (pageNo !== undefined) {
        params = params.set('Page_No', pageNo.toString());
      }
      if (pageSize !== undefined) {
        params = params.set('Page_Size', pageSize.toString());
      }

      return this.http.get<any>(url, { params });
    }


    uploadImage(file: File) {
    const url = `${environment.apiUrl}/Basics/UploadSingleFile`;

      const formData = new FormData();
      formData.append('fileData', file);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}` // If authentication is required
      });

      return this.http.post(url, formData, { headers });
    }

    setIssuePublishStatus(issueId: string): Observable<any> {
      const url = `${environment.apiUrl}/WokersStaff/SetIssuePublishStatus`;
      const token = localStorage.getItem('token'); // Retrieve the token from local storage

      const headers = new HttpHeaders({
        'Accept': 'text/plain',
        'Authorization': `Bearer ${token}`
      });

      return this.http.post<any>(`${url}?Issue_ID=${issueId}`, null, { headers });
    }

    assignIssue(issueId: string, assignsId: string): Observable<any> {
      const url = `${environment.apiUrl}/WokersStaff/AssignIssue`;
      const token = localStorage.getItem('token'); // Retrieve the token from local storage

      const params = new HttpParams()
        .set('Issue_ID', issueId)
        .set('Assigns_ID', assignsId);

      const headers = new HttpHeaders({
        'accept': 'text/plain'   ,
        'Authorization': `Bearer ${token}`
      });

      return this.http.post<any>(url, null, { headers, params });
    }

    deleteIssue(issueId: string): Observable<any> {
      const url = `${environment.apiUrl}/WokersStaff/DeleteIssue`;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'accept': 'text/plain'   ,
        'Authorization': `Bearer ${token}`
      });
      const params = new HttpParams().set('Issue_ID', issueId);

      return this.http.delete(url, { headers, params });
    }


}
