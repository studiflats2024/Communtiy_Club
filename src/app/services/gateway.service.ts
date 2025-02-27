import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
 


@Injectable({
  providedIn: 'root',
})
export class GatewayService {
 



  constructor( private http: HttpClient) {}

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
    const url = `${environment.apiUrl}/Gateway/SendSubscriptionAlert?Subscripe_ID=${subscribeId}`;
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


  reviewPublish(id: string, publish: boolean): Observable<any> {
    const params = new HttpParams()
      .set('ID', id)
      .set('Publish', publish.toString());

    return this.http.post(`${environment.apiUrl}/Gateway/ReviewPublish`, {}, { params });
  }



  getAllTransactions(pageNo: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('Page_No', pageNo.toString())
      .set('Page_Size', pageSize.toString());

    return this.http.get(`${environment.apiUrl}/Gateway/GetAllTransactions`, { params });
  }

  addMemberToPlan(planId: string, memberId: string): Observable<any> {
    const params = new HttpParams()
      .set('Plan_ID', planId)
      .set('Member_ID', memberId);

    return this.http.post(`${environment.apiUrl}/Gateway/AddMemberToPlan`, null, { params });
  }

  publishActivity(activityId: string, type: string, publish: boolean): Observable<any> {
    const params = new HttpParams()
      .set('Activity_ID', activityId)
      .set('_Type', type)
      .set('Publish', publish.toString());

    return this.http.post(`${environment.apiUrl}/Gateway/Publish_Activity`, null, { params });
  }

  getAllMembersUsers(pageNo: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('Page_No', pageNo.toString())
      .set('Page_Size', pageSize.toString());

    return this.http.get(`${environment.apiUrl}/Gateway/GetAllMembers_Users`, { params });
  }



  getAllParticipantsActivity(pageNo: number, pageSize: number, type?: string, id?: string): Observable<any> {
    let params = new HttpParams()
      .set('Page_No', pageNo.toString())
      .set('Page_Size', pageSize.toString());

    if (type) {
      params = params.set('Type', type);
    }

    if (id) {
      params = params.set('ID', id);
    }

    return this.http.get(`${environment.apiUrl}/Gateway/GetAllParticipants_Activity`, { params });
  }



   // ✅ Fetch all admins with pagination
   getAllAdmins(pageNo: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('Page_No', pageNo)
      .set('Page_Size', pageSize);

    const headers = new HttpHeaders({
      'Accept': 'application/json' // 🔹 Ensure response is JSON
    });

    return this.http.get<any>(`${environment.apiUrl}/Gateway/GetAllAdmins`, { params, headers });
  }


    // ✅ Add New Admin
    addAdmin(adminData: any): Observable<any> {
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/json' 
      });
  
      return this.http.post<any>(`${environment.apiUrl}/Gateway/Add_New_Admin`, adminData, { headers });
    }

    updateAdmin(adminData: any): Observable<any> {
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/json' 
      });
      return this.http.post<any>(`${environment.apiUrl}/Gateway/Update_Admin`, adminData, { headers });
    }


    uploadImage(file: any) {
      const url = `${environment.apiUrl}/Basics/UploadSingleFile`;
  
        const formData = new FormData();
        formData.append('fileData', file);
  
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}` // If authentication is required
        });
  
        return this.http.post(url, formData, { headers });
      }

    // ✅ Fetch Admin Profile by ID
  getAdminProfile(adminId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Gateway/GetAdminProfile?ID=${adminId}`);
  }


  updatePassword(user_ID: string, oldPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    

    const body = {
      user_ID:user_ID,
      old_Password: oldPassword,
      newPassword:newPassword,
      confirmPassword:confirmPassword
    };

    return this.http.post(`${environment.apiUrl}/Gateway/Update_Password`, body);
  }



  getFinancePayments(pageNo: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('Page_No', pageNo.toString())
      .set('Page_Size', pageSize.toString());

    return this.http.get<any>(`${environment.apiUrl}/Gateway/GetFinancePayments`, { params });
  }

  getFinanceInvoice(id: string): Observable<any> {
    const params = new HttpParams().set('ID', id);

    return this.http.get<any>(`${environment.apiUrl}/Gateway/GetFinanceInvoice`, { params });
  }



///////activity details from gateway//////////
getActivityDetailsGateway(type:string, id:string){
  let params =new HttpParams();
  if (type) params= params.set('type',type);
  if (id) params=params.set('ID',id)

    return this.http.get(`${environment.apiUrl}/Gateway/GetActivityDetails`,{params,responseType:'json'})
}

getFinanceStatics(): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/Gateway/GetFiananceStatics`);
}
}


