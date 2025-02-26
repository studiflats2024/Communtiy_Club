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
  reviews : any[]=[]

constructor(private route: ActivatedRoute,private messageService:MessageService,private activityService:ActivityService){

}
activityId: any;
activityType: string | null = null;

ngOnInit() {

  this.reviews = [
    {
      photo: 'https://randomuser.me/api/portraits/men/1.jpg',
      name: 'John Doe',
      date: '2025-02-20',
      rating: 4.5,
      comment: 'Great course! The instructor explained everything clearly.',
      has_Published: true
    },
    {
      photo: 'https://randomuser.me/api/portraits/women/2.jpg',
      name: 'Sarah Smith',
      date: '2025-02-18',
      rating: 5,
      comment: 'Amazing experience! Highly recommend to everyone.',
      has_Published: false
    },
    {
      photo: 'https://randomuser.me/api/portraits/men/3.jpg',
      name: 'Michael Johnson',
      date: '2025-02-15',
      rating: 4,
      comment: 'Very informative and well-structured course. Could use more examples.',
      has_Published: true
    },
    {
      photo: 'https://randomuser.me/api/portraits/women/4.jpg',
      name: 'Emily Brown',
      date: '2025-02-10',
      rating: 3.5,
      comment: 'Good content but a bit fast-paced for beginners.',
      has_Published: false
    },
    {
      photo: 'https://randomuser.me/api/portraits/men/5.jpg',
      name: 'James Wilson',
      date: '2025-02-05',
      rating: 5,
      comment: 'Loved it! The course was easy to follow and very engaging.',
      has_Published: true
    }
  ];
  

  this.activityId = this.route.snapshot.paramMap.get('id');
  this.activityType = this.route.snapshot.paramMap.get('type');
  this.checkActivityType() ;
  if (this.activityId&&this.activityType) {
    // this.getDetailsActivity();
    this.gatewayActivityDetails(this.activityType,this.activityId)
  }


  this.items = [
    { label: 'Community Club', routerLink: '/dashboard' },

    { label: 'Activities', routerLink: '/activities' },


    { label: 'Activity Details', routerLink: '/activity-details' },
    
  ];

  
}


checkActivityType() {
   
  if(this.activityType==="Courses"){
    this.activityType='Course'
     
  }else if(this.activityType==="Events"){
    this.activityType='Event'

  }else if(this.activityType==="Workshops"){
    this.activityType='Workshop'
      
  }else if(this.activityType==="Consultant"){
    this.activityType='Consult'
    
  }
}


IntegrateDetailsActivity(response:any) {
   console.log(this.activityType)
  if(this.activityType==="Course"){
    this.updateCourseDetails(response)
     
  }else if(this.activityType==="Event"){
    this.updateEventDetails(response);
  }else if(this.activityType==="Workshop"){
     
    this.updateWorkshopDetails(response);

   
  }else if(this.activityType==="Consult"){
    this.updateConsultDetails(response)

    
     

    
  }
}

scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  /////////////////////////////////update details with gateway activity details api /////////////////////
  gatewayActivityDetails(type:any,id:any){
     this. activityService.getActivityDetailsGateway(type,id).subscribe({
      next:(data)=>{
        console.log(data)
        this.activityDetails=data
        this.IntegrateDetailsActivity(data)
      },
      error:(err)=>console.error('Error fetching activity:', err)
     })
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
 
   
  this.title = courseDetails.activity_Name || '';
  this.discription = courseDetails.activity_Description|| '';
  this.location = courseDetails.activity_Location || '';
  // this.displayOnApp = courseDetails.dispaly_Home || false;  
  this.videoLink = courseDetails.video_Link || '';
  this.images = courseDetails.activity_Media || '';
  this.published=courseDetails.status
  this.booking=courseDetails.bookings
  //  this.reviews=courseDetails.activity_Rating
   this.rate=courseDetails.activity_Rating
   this.reviews=courseDetails.ratings
  // Parse and format start and end dates
  // this.startDate = courseDetails.course_Start_Date
  //   ? new Date(courseDetails.course_Start_Date)
  //   : null;
  this.startDate=courseDetails.activity_Start_Date
  this.endDate = courseDetails.activity_End_Date;

  this.seatsAvailable = courseDetails.available_Seats  || 0;
  
 
  // Map the sessions
  this.sessions = courseDetails.sessions_Course_Workshop.map((session: any) => ({
    session_ID: session.session_ID || '',
    session_Title: session.session_Title || '',
    session_Date: session.session_Date
      ? new Date(session.session_Date)
      : null,
    start_Time: session.start_Time || '',
    end_Time: session.end_Time || '',

    has_Published: session.has_Published || true,
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

  
 

  this.title = consultDetails.activity_Name|| '';
  this.discription = consultDetails.activity_Description|| '';
  this.location = consultDetails.activity_Location || '';
  // this.displayOnApp = consultDetails.dispaly_Home || false;
  
  this.images = consultDetails.activity_Media || '';
  this.videoLink = consultDetails.video_Link || '';
  this.published=consultDetails.status
  this.booking=consultDetails.bookings
  this.reviews=consultDetails.ratings
  this.rate=consultDetails.activity_Rating



  
  // Update sessionsDays with the data from the API
  this.sessionsDays = consultDetails.sessions_Consults.map((session: any) => ({
    session_ID: session.session_ID || '',
    session_Day: session.session_Day || '',
    session_Start_Time: session.session_Start_Time || '',
    session_End_Time: session.session_End_Time || '',
    session_Duration: session.session_Duration || 0,
    has_Published: session.has_Published || true,
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


  this.title = eventDetails.activity_Name || '';
  this.discription = eventDetails.activity_Description || '';
  this.location = eventDetails.activity_Location || '';
  // this.displayOnApp = eventDetails.dispaly_Home ? 'yes' : 'no';
  this.videoLink = eventDetails.video_Link || '';
  this.images = eventDetails.activity_Media || '';
  this.published=eventDetails.status
  this.booking=eventDetails.bookings
  this.reviews=eventDetails.ratings
  this.rate=eventDetails.activity_Rating


  // this.eventDate = eventDetails.event_Date ? new Date(eventDetails.event_Date) : null;
  // this.startTime = eventDetails.event_Start_Time || null;
  // this.endTime = eventDetails.event_End_Time || null;
  // this.eventDate = eventDetails.activity_Date? new Date(eventDetails.activity_Date) : null;
  this.eventDate = eventDetails.activity_Date ;

  // this.startTime = eventDetails.event_Start_Time || null;
  // this.endTime = eventDetails.event_End_Time || null;

  if (eventDetails.activity_Time) {
    const timeParts = eventDetails.activity_Time.split(' - '); // Split start & end time
    this.startTime = timeParts[0] || null; // First part is start time
    this.endTime = timeParts[1] || null; // Second part is end time
  } 
  this.seatsAvailable = eventDetails.available_Seats || 0;
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
rate:any
bookingNo:any
updateWorkshopDetails(workshopDetails: any): void {


 
  
  this.title = workshopDetails.activity_Name|| '';
  this.discription = workshopDetails.activity_Description || '';
  this.location = workshopDetails.activity_Location || '';
  this.displayOnApp = workshopDetails.dispaly_Home || false; // Convert to boolean if needed
  this.videoLink = workshopDetails.video_Link || '';
  this.images = workshopDetails.activity_Media || '';
  this.published=workshopDetails.status
  this.booking=workshopDetails.bookings
  this.rate=workshopDetails.activity_Rating
 this.reviews=workshopDetails.ratings

  // Parse and format start and end dates
  this.startDate = workshopDetails.activity_Start_Date;
  this.endDate = workshopDetails.activity_End_Date;

  this.seatsAvailable = workshopDetails.available_Seats || 0;
 
  // Map the sessions
  this.sessions = workshopDetails.sessions.map((session: any) => ({
    session_ID: session.session_ID || '',
    session_Title: session.session_Title || '',
    session_Date: session.session_Date 
      ? new Date(session.session_Date) 
      : null,
    start_Time: session.start_Time || '',
    end_Time: session.end_Time || '',
    has_Published: session.has_Published || true,
    session_Link: session.session_Link || '',
    addVideo: session.addVideo || 'no', // Assuming addVideo is handled elsewhere
  }));
}



getActivityClass(activityType: string | null): string {
  if (!activityType) return '';

  switch (activityType.toLowerCase()) {
    case 'course':
      return 'type-success';
    case 'consult':
      return 'type-danger';
    case 'workshop':
      return 'type-purble';
    case 'event':
      return 'type';
    default:
      return 'type'; // Default styling
  }
}




displayHome(id:any,publish:any){

  this.activityService.reviewPublish(id,  publish).subscribe(
    (response) => {
      this.messageService.add({ severity: 'success', summary:'Success', detail:response.message });
      console.log('Success:', response);
    },
    (error) => {
      this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });
      console.error('Error:', error);
    }
  );

}


}
