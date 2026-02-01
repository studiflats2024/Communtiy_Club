import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// DTO coming from GET API
export interface WorkingHours {
    id: string;
    day: string | null;
    day_Code: string | null;
    open_From: string | null;
    open_To: string | null;
    is_Opened: boolean;
    available_Slots_Count: number;
}

// GET response wrapper
export interface WorkingHoursListResponse {
    data: WorkingHours[] | null;
    succeeded: boolean;
    errors: string[] | null;
    message: string | null;
}

// DTO used for UPDATE API
export interface WorkingHoursUpdate {
    id: string;
    day: string | null;
    day_Code: string | null;
    open_From: string | null;
    open_To: string | null;
    is_Opened: boolean;
    available_Slots_Count: number;
}

// UI model used inside component
export interface WorkingDay {
    id: string;
    day: string;
    dayArabic: string;
    dayCode: string;
    isEnabled: boolean;
    fromTime: string;
    toTime: string;
    available_Slots_Count: number;
}

@Injectable({
    providedIn: 'root',
})

export class SettingsService {

    //   private baseUrl = 'https://devapi.studiflats.com/api/AppointmentBooking';

    constructor(private http: HttpClient) { }

    // GET working hours
    getWorkingHours(): Observable<WorkingHoursListResponse> {
        return this.http.get<WorkingHoursListResponse>(
            `https://devapi.studiflats.com/api/AppointmentBooking/WorkingHours`
        );
    }

    // UPDATE working hours
    updateWorkingHours(payload: WorkingHoursUpdate[]): Observable<any> {
        return this.http.put(
            `https://devapi.studiflats.com/api/AppointmentBooking/WorkingHours`,
            payload
        );
    }
}