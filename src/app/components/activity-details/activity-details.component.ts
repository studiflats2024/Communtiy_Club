import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgClass } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ActivityService } from '../../services/activity.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-details',
  standalone: true,
    imports: [BadgeModule,TabViewModule,TagModule,TableModule,ButtonModule,MenuModule,OverlayPanelModule,CardModule,ToastModule,DialogModule,CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule ],
    providers: [MessageService],
  
  templateUrl: './activity-details.component.html',
  styleUrl: './activity-details.component.css'
})
export class ActivityDetailsComponent {
  items:any;
  activeTab: string = 'basic-info';
  sessions : any[]=[]
constructor(private route: ActivatedRoute,private messageService:MessageService,private activityService:ActivityService){

}
activityId: any;
activityType: string | null = null;

ngOnInit() {

  this.activityId = this.route.snapshot.paramMap.get('id');
  this.activityType = this.route.snapshot.paramMap.get('type');
  if (this.activityId&&this.activityType) {
    this.getDetailsActivity();
  }


  this.items = [
    { label: 'Community Club', routerLink: '/dashboard' },

    { label: 'Activities', routerLink: '/activities' },


    { label: 'Activity Details', routerLink: '/activity-details' },
    
  ];

  
}
////////////////////////////////////get details depend on type/////////////////////////////////
getDetailsActivity() {
   
  if(this.activityType==="Courses"){
    this.fetchCourseDetails(this.activityId)
     
  }else if(this.activityType==="Events"){
    this.fetchEventDetails(this.activityId)
     
     
  }else if(this.activityType==="Workshops"){
     
    this.fetchWorkshopDetails(this.activityId)
   

  }else if(this.activityType==="Consultant"){
    this.fetchConsultDetails(this.activityId)
    
     

    
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////
activityDetails:any
fetchCourseDetails(courseId: string): void {
  this.activityService.getCourseDetails(courseId).subscribe({
    next: (response) => {

      this.activityDetails = response;
      this.updateCourseDetails(response)
      console.log('Course Details:', this.activityDetails);
    },
    error: (error) => {
      console.log('Error fetching course details:', error);
    },
  });
}
//update//
title:any;
discription:any;
location:any;
images:any;
displayOnApp:any
startDate:any
endDate:any
seatsAvailable:any
published:any
booking:any
updateCourseDetails(courseDetails: any): void {
 
   
  this.title = courseDetails.course_Name || '';
  this.discription = courseDetails.course_Description || '';
  this.location = courseDetails.course_Location || '';
  this.displayOnApp = courseDetails.dispaly_Home || false; // Convert to boolean if needed
  this.videoLink = courseDetails.video_Link || '';
  this.images = courseDetails.course_Image || '';
  this.published=courseDetails.has_Published
  this.booking=courseDetails.bookings

  // Parse and format start and end dates
  this.startDate = courseDetails.course_Start_Date
    ? new Date(courseDetails.course_Start_Date)
    : null;
  this.endDate = courseDetails.course_End_Date
    ? new Date(courseDetails.course_End_Date)
    : null;

  this.seatsAvailable = courseDetails.availabile_Seats || 0;

  // Map the sessions
  this.sessions = courseDetails.sessions.map((session: any) => ({
    session_ID: session.session_ID || '',
    session_Title: session.session_Title || '',
    session_Date: session.session_Date
      ? new Date(session.session_Date)
      : null,
    start_Time: session.start_Time || '',
    end_Time: session.end_Time || '',
    has_Published: session.has_Published || false,
    session_Link: session.session_Link || '',
    addVideo: session.addVideo || 'no', // Assuming `addVideo` is handled elsewhere
  }));
}

/////////
fetchConsultDetails(consultId: string): void {
  this.activityService.getConsultDetails(consultId).subscribe({
    next: (response) => {
      this.activityDetails = response;
      this.updateConsultDetails(response)
      console.log('Consultant Details:', this.activityDetails);
    },
    error: (error) => {
      console.log('Error fetching consultant details:', error);
    },
  });
}

//update//
sessionsDays:any[]=[]
videoLink:any
updateConsultDetails(consultDetails: any): void {

  
 

  this.title = consultDetails.consult_Name || '';
  this.discription = consultDetails.consult_Description || '';
  this.location = consultDetails.consult_Location || '';
  this.displayOnApp = consultDetails.dispaly_Home || false;
  
  this.images = consultDetails.consult_Image || '';
  this.videoLink = consultDetails.video_Link || '';
  this.published=consultDetails.has_Published
  this.booking=consultDetails.bookings


  
  // Update sessionsDays with the data from the API
  this.sessionsDays = consultDetails.sessions.map((session: any) => ({
    session_ID: session.session_ID || '',
    session_Day: session.session_Day || '',
    session_Start_Time: session.session_Start_Time || '',
    session_End_Time: session.session_End_Time || '',
    session_Duration: session.session_Duration || 0,
    has_Published: session.has_Published || false,
    session_Available_Seats: session.seession_Available_Seats || 0
  }));


  
   
}

//////////


fetchEventDetails(eventId: string): void {
  this.activityService.getEventDetails(eventId).subscribe({
    next: (response) => {
      this.activityDetails = response;
      this.updateEventDetails(response);
      console.log('Event Details:', this.activityDetails);
    },
    error: (error) => {
      console.log('Error fetching event details:', error);
    },
  });
}
eventDate:any;
startTime:any
endTime:any
////update values///
updateEventDetails(eventDetails: any): void {


  this.title = eventDetails.event_Name || '';
  this.discription = eventDetails.event_Description || '';
  this.location = eventDetails.event_Location || '';
  this.displayOnApp = eventDetails.dispaly_Home ? 'yes' : 'no';
  this.videoLink = eventDetails.video_Link || '';
  this.images = eventDetails.event_Image || '';
  this.published=eventDetails.event_Status
  this.booking=eventDetails.bookings


  // this.eventDate = eventDetails.event_Date ? new Date(eventDetails.event_Date) : null;
  // this.startTime = eventDetails.event_Start_Time || null;
  // this.endTime = eventDetails.event_End_Time || null;
  this.eventDate = eventDetails.event_Date ? new Date(eventDetails.event_Date) : null;
  this.startTime = eventDetails.event_Start_Time || null;
  this.endTime = eventDetails.event_End_Time || null;
  this.seatsAvailable = eventDetails.availabile_Seats || 0;
}

/////////

fetchWorkshopDetails(workshopId: string): void {
  this.activityService.getWorkshopDetails(workshopId).subscribe({
    next: (response) => {
      this.activityDetails = response;
      this.updateWorkshopDetails(response);
      console.log('Workshop Details:', this.activityDetails);
    },
    error: (error) => {
      console.log('Error fetching workshop details:', error);
    },
  });
}


//update//
updateWorkshopDetails(workshopDetails: any): void {


 
  
  this.title = workshopDetails.workshop_Name || '';
  this.discription = workshopDetails.workshop_Description || '';
  this.location = workshopDetails.workshop_Location || '';
  this.displayOnApp = workshopDetails.dispaly_Home || false; // Convert to boolean if needed
  this.videoLink = workshopDetails.video_Link || '';
  this.images = workshopDetails.workshop_Image || '';
  this.published=workshopDetails.has_Published
  this.booking=workshopDetails.bookings


  // Parse and format start and end dates
  this.startDate = workshopDetails.workshop_Start_Date 
    ? new Date(workshopDetails.workshop_Start_Date) 
    : null;
  this.endDate = workshopDetails.workshop_End_Date 
    ? new Date(workshopDetails.workshop_End_Date) 
    : null;

  this.seatsAvailable = workshopDetails.availabile_Seats || 0;

  // Map the sessions
  this.sessions = workshopDetails.sessions.map((session: any) => ({
    session_ID: session.session_ID || '',
    session_Title: session.session_Title || '',
    session_Date: session.session_Date 
      ? new Date(session.session_Date) 
      : null,
    start_Time: session.start_Time || '',
    end_Time: session.end_Time || '',
    has_Published: session.has_Published || false,
    session_Link: session.session_Link || '',
    addVideo: session.addVideo || 'no', // Assuming addVideo is handled elsewhere
  }));
}



getActivityClass(activityType: string | null): string {
  if (!activityType) return '';

  switch (activityType.toLowerCase()) {
    case 'courses':
      return 'type-success';
    case 'consultant':
      return 'type-danger';
    case 'workshops':
      return 'type-purble';
    case 'events':
      return 'type';
    default:
      return 'type'; // Default styling
  }
}


}
