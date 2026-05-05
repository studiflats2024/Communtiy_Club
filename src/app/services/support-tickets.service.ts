import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportTicketsService {
  private readonly apiUrl = 'https://devapi.studiflats.com/api/SupportTicket';

  constructor(private http: HttpClient) { }

  // Get paginated tickets list
  getTicketsList(
    Page_No: number = 1,
    Page_Size: number = 10,
    searchTerm?: string,
  ): Observable<SupportTicket_Dashboard_Response> {
    let params = new HttpParams()
      .set('Page_No', Page_No.toString())
      .set('Page_Size', Page_Size.toString());

    if (searchTerm && searchTerm.trim()) {
      params = params.set('SearchTerm', searchTerm);
    }

    return this.http.get<SupportTicket_Dashboard_Response>(`${this.apiUrl}/GetPaginatedTickets`, { params });
  }

  // Update ticket status
  updateTicketStatus(ticketId: string, status: string) {
    const body = { ticket_ID: ticketId, status: status };

    return this.http.post<any>(`${this.apiUrl}/UpdateTicketStatus`, body);
  }

  // Get ticket details
  getTicketDetails(ticketId: string): Observable<SupportTicket_Details> {
    const params = new HttpParams().set('Ticket_ID', ticketId);
    // return this.http.get<SupportTicket_Details>(`${this.apiUrl}/GetTicketDetails`, { params });
    return this.http.get<SupportTicket_Details>(`${this.apiUrl}/GetTicketDetails?Ticket_ID=${ticketId}`);
  }

  // POST reply
  addReply(replyData: SupportTicket_Reply_Request): Observable<SupportTicket_Reply_Response> {
    return this.http.post<SupportTicket_Reply_Response>(`${this.apiUrl}/AddReply`, replyData);
  }

}


// ==================== Support Tickets List Interfaces ====================
export interface SupportTicket_Dashboard_Response {
  statistics: SupportTicket_Statistics;
  tickets: SupportTicket_ListPagination;
}

export interface SupportTicket_Statistics {
  total_Tickets: number;
  pending_Tickets: number;
  solved_Tickets: number;
}

export interface SupportTicket_ListPagination {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  data: SupportTicket_List[];
  nextPage: string;
  previousPage: string;
  firstPage: string;
  lastPage: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SupportTicket_List {
  ticket_ID: string;
  ticket_Code: string;
  requested_By_Name: string;
  requested_By_Email: string;
  created_At: string;
  issue_Type: Ticket_Issue_Type;
  status: Ticket_Status;
}

export enum Ticket_Issue_Type {
  Cancel_My_Plan = 'Cancel_My_Plan',
  Billing_Issue = 'Billing_Issue',
  Technical_Issue = 'Technical_Issue',
  Account_Issue = 'Account_Issue',
  Other = 'Other'
}

export enum Ticket_Status {
  Pending = 'Pending',
  Solved = 'Solved',
  Closed = 'Closed'
}

export interface UpdateStatusRequest {
  ticket_ID: string;
  status: Ticket_Status;
}

export interface UpdateStatusResponse {
  status: string;
  message: string;
  uuid: string;
  rooms_IDs: string[];
  rooms_Names: string[];
}

// ==================== Support Tickets Details Interfaces ====================
export interface SupportTicket_Details {
  ticket_ID: string;
  ticket_Code: string;
  tenant_Name: string;
  tenant_Email: string;
  issue_Type: Ticket_Issue_Type;
  ticket_Subject: string;
  ticket_Description: string;
  status: Ticket_Status;
  created_At: string;
  updated_At: string;
  replies: SupportTicket_Reply[];
}

export interface SupportTicket_Reply {
  reply_ID: string;
  reply_By_Name: string;
  reply_By_Email: string;
  reply_Message: string;
  attachment_URL: string;
  created_At: string;
}

export interface SupportTicket_Reply_Request {
  ticket_ID: string;
  reply_Message: string;
  attachment_URL: string | null;
}

export interface SupportTicket_Reply_Response {
  status: string;
  message: string;
  uuid: string;
  rooms_IDs: string[];
  rooms_Names: string[];
}
