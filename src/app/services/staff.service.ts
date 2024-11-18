import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {



  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    const apiUrl = 'https://restcountries.com/v3.1/all';
    return this.http.get<any>(apiUrl);
  }
}
