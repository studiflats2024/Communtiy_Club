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
  
      /////////////////////////////////////////////activity list//////////////////////////////
        getPaginatedActivities(type:string,pageNumber:number,pageSize:number):Observable<any>{
          const params = new HttpParams().set('_Type', type);

          const headers = new HttpHeaders({
            Accept: 'text/plain',
            'Content-Type': 'application/json',
          });
      
          const body = {
            pageNumber: pageNumber,
            pageSize: pageSize,
          };
      
          return this.http.post(`${environment.apiUrl}/Gateway/GetPaginatedActivites`, body, { params, headers });
        }


        ///////////////activities delete apis/////////////////////////////
        deleteConsult(consultId: string): Observable<any> {
          const params = new HttpParams().set('Consult_ID', consultId);
      
          return this.http.delete(`${environment.apiUrl}/Consults/DeleteConsult`, { params });
        }

        deleteCourse(courseId: string): Observable<any> {
          const params = new HttpParams().set('Course_ID', courseId);
      
          return this.http.delete(`${environment.apiUrl}/Courses/DeleteCourse`, { params });
        }

        deleteEvent(eventId: string): Observable<any> {
          const params = new HttpParams().set('Event_ID', eventId);
      
          return this.http.delete(`${environment.apiUrl}/Events/DeleteEvent`, { params });
        }

        deleteWorkshop(workshopId: string): Observable<any> {
          const params = new HttpParams().set('Workshop_ID', workshopId);
      
          return this.http.delete(`${environment.apiUrl}/Workshops/DeleteWorkshop`, { params });
        }



        ///////////////////////////////////Details apis activity///////////////////////////////


        getCourseDetails(courseId: string): Observable<any> {
          const url = `${environment.apiUrl}/Courses/GetCourse_Details?ID=${courseId}`;
          return this.http.get<any>(url);
        }

        getConsultDetails(consultId: string): Observable<any> {
          const url = `${environment.apiUrl}/Consults/GetConsult_Details?ID=${consultId}`;
          return this.http.get<any>(url);
        }

        getEventDetails(eventId: string): Observable<any> {
          const url = `${environment.apiUrl}/Events/GetEventDetails?ID=${eventId}`;
          return this.http.get<any>(url);
        }

        getWorkshopDetails(workshopId: string): Observable<any> {
          const url = `${environment.apiUrl}/Workshops/GetWorkshop_Details?ID=${workshopId}`;
          return this.http.get<any>(url);
        }


        /////////////////////////////////////////update activity api ////////////////////////////
        updateConsultDetails(consultDetails: any): Observable<any> {
          const url = `${environment.apiUrl}/Consults/UpdateConsult`;
          return this.http.post(url, consultDetails);
        }

        updateCourse(courseData: any): Observable<any> {
          return this.http.post(`${environment.apiUrl}/Courses/UpdateCourse`, courseData);
        }

        updateWorkshop(workshopDetails: any): Observable<any> {
          const url = `${environment.apiUrl}/Workshops/UpdateWorkshop`;
          return this.http.post<any>(url, workshopDetails);
        }

        updateEvent(eventDetails: any): Observable<any> {
          const url = `${environment.apiUrl}/Events/UpdateEvent`;
          return this.http.post<any>(url, eventDetails);
        }

        ///////////////////////////////actions////////////////////////////
        reviewPublish(id: string, publish: boolean): Observable<any> {
          const params = new HttpParams()
            .set('ID', id)
            .set('Publish', publish.toString());
      
          return this.http.post(`${environment.apiUrl}/Gateway/ReviewPublish`, {}, { params });
        }

        publishActivity(activityId: string, type: string, publish: boolean): Observable<any> {
          const params = new HttpParams()
            .set('Activity_ID', activityId)
            .set('_Type', type)
            .set('Publish', publish.toString());
      
          return this.http.post(`${environment.apiUrl}/Gateway/Publish_Activity`, null, { params });
        }



  displayHomeActivity(activityId: string, type: string, display: boolean): Observable<any> {
    const params = new HttpParams()
      .set('Activity_ID', activityId)
      .set('_Type', type)
      .set('Display', display.toString());

    return this.http.post(`${environment.apiUrl}/Gateway/DisplayHome_Activity`, null, { params });
  }


  cancelEvent(activityId: string, reason: string): Observable<any> {
    const params = new HttpParams()
      .set('Activity_ID', activityId)
      .set('Reason', reason);

    return this.http.post(`${environment.apiUrl}/Gateway/Cancel_Evnet`, null, { params });
  }

  postponeEvent(eventId: string, reason: string, toDate: string): Observable<any> {
    const params = new HttpParams()
      .set('Event_ID', eventId)
      .set('Reason', reason)
      .set('To', toDate);

    return this.http.post(`${environment.apiUrl}/Gateway/Postpone_Evnet`, null, { params });
  }


  
///////activity details from gateway//////////
getActivityDetailsGateway(type:string, id:string){
  let params =new HttpParams();
  if (type) params= params.set('type',type);
  if (id) params=params.set('ID',id)

    return this.http.get(`${environment.apiUrl}/Gateway/GetActivityDetails`,{params,responseType:'json'})
}
}
