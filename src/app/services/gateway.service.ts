import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class GatewayService {
 

  constructor(private http: HttpClient) {}

  getPaymentRecords(
    pageNumber: number,
    pageSize: number,
    type: string = '',
    status: string = '',
    paymentBy: string = '',
    from: string = '',
    to: string = '',
    searchWord: string = ''
  ): Observable<any> {
    let params = new HttpParams()
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString());

    if (type) params = params.set('type', type);
    if (status) params = params.set('Status', status);
    if (paymentBy) params = params.set('Payment_By', paymentBy);
    if (from) params = params.set('From', from);
    if (to) params = params.set('To', to);
    if (searchWord) params = params.set('SearchWord', searchWord);

    const url = `${environment.apiUrl}/Gateway/GetAllPaymentRecords`;

    return this.http.get<any>(url, { params });
  }

  setInvoicePaid(invId: string): Observable<any> {
    const params = new HttpParams().set('Inv_ID', invId);
    return this.http.post(`${environment.apiUrl}/Gateway/SetInvoicePaid`, null, { params });
  }

  setInvoiceUnPaid(invId: string): Observable<any> {
    const params = new HttpParams().set('Inv_ID', invId);
    return this.http.post(`${environment.apiUrl}/Gateway/SetInvoiceUnPaid`, null, { params });
  }


  ////////////////////////////////subscriptions/////////////////////
  getSubscriptionAlerts(
    pageNumber: number,
    pageSize: number,
    type: string = '',
    from: string = '',
    to: string = '',
    searchWord: string = ''
  ): Observable<any> {
    let params = new HttpParams()
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString());

    if (type) params = params.set('type', type);
    if (from) params = params.set('From', from);
    if (to) params = params.set('To', to);
    if (searchWord) params = params.set('SearchWord', searchWord);

    return this.http.get(`${environment.apiUrl}/Gateway/GetAllSubscriptionAlerts`, { params });
  }


  sendSubscriptionAlert(subscribeId: string): Observable<any> {
    const url = `${environment.apiUrl}/Gateway/SendSubscriptionAlert?Subscrip
    e_ID=${subscribeId}`;
    return this.http.post(url, {});
  }
  


  /**
   * Fetch all members with pagination.
   * @param pageNumber The page number to fetch.
   * @param pageSize The number of records per page.
   * @returns An Observable of the API response.
   */
  getAllMembers(pageNumber: number, pageSize: number): Observable<any> {
    // Add query parameters for pagination
    const url = `${environment.apiUrl}/Gateway/GetAllMembers`;
    const params = new HttpParams()
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString());

    // Make the GET request with parameters
    return this.http.get<any>(url, { params });
  }




    /**
   * Fetch member details by Subscription_ID.
   * @param subscriptionId The subscription ID to fetch details for.
   * @returns An Observable of the member details.
   */
    getMemberDetails(subscriptionId: string): Observable<any> {
    const url = `${environment.apiUrl}/Gateway/GetMemberDetails`;

      const params = new HttpParams().set('Subscription_ID', subscriptionId);
  
      return this.http.get<any>(url, { params });
    }
  
    




  /**
   * Fetch all invitations with pagination.
   * @param pageNumber - The page number.
   * @param pageSize - The number of records per page.
   * @returns Observable<any>
   */
  getAllInvitations(pageNumber: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString());

    return this.http.get(`${environment.apiUrl}/Gateway/GetAllInvitations`, { params });
  }
}


