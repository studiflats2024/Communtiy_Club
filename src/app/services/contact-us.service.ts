import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ContactUsService {

    constructor(private http: HttpClient) { }

    // Get paginated Contact Us list
    contactList(
        Page_No: number = 1,
        Page_Size: number = 10,
        searchTerm?: string,
    ): Observable<ContactUs_Dashboard_Response> {
        let params = new HttpParams()
            .set('Page_No', Page_No.toString())
            .set('Page_Size', Page_Size.toString());

        if (searchTerm && searchTerm.trim()) {
            params = params.set('SearchTerm', searchTerm);
        }

        return this.http.get<ContactUs_Dashboard_Response>(`${environment.apiUrl}/ContactUs/GetPaginatedRequests`, { params });
    }

    contactDetails(id: string): Observable<ContactUs_Details> {
        return this.http.get<ContactUs_Details>(`${environment.apiUrl}/ContactUs/GetRequestDetails?Request_ID=${id}`);
    }

    replyToRequest(payload: ContactUs_Reply): Observable<ContactUs_Reply_Response> {
        return this.http.post<ContactUs_Reply_Response>(`${environment.apiUrl}/ContactUs/ReplyToRequest`, payload);
    }

}

export interface ContactUs_Dashboard_Response {
    statistics: ContactUs_Statistics;
    requests: ContactUs_ListPaginationResult;
}

export interface ContactUs_Statistics {
    total_Requests: number;
    pending_Requests: number;
    responded_Requests: number;
}

export interface ContactUs_ListPaginationResult {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    data: ContactUs_List[];
    nextPage: string;
    previousPage: string;
    firstPage: string;
    lastPage: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface ContactUs_List {
    request_ID: string;
    request_Code: string;
    name: string;
    email: string;
    phone_Number: string;
    created_At: string;
    status: ContactUs_StatusContactUs_Status;
}

export enum ContactUs_StatusContactUs_Status {
    Pending = 'Pending',
    Responded = 'Responded'
}

// details 
export interface ContactUs_Details {
    request_ID: string;
    request_Code: string;
    name: string;
    email: string;
    phone_Number: string;
    your_Needs: string;
    status: ContactUs_StatusContactUs_Status;
    reply_Message: string;
    created_At: string;
    replied_At: string;
}

// reply
export interface ContactUs_Reply {
    request_ID: string;
    reply_Message: string | null;
}

export interface ContactUs_Reply_Response {
    status: string | null;
    message: string | null;
    uuid: string | null;
    rooms_IDs: string[] | null;
    rooms_Names: string[] | null;
}