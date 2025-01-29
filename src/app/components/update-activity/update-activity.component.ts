import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgClass } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';  // File upload
import { GalleriaModule } from 'primeng/galleria';      // Image gallery
import { ButtonModule } from 'primeng/button';
import { DragDropModule } from 'primeng/dragdrop';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

import { Router, ActivatedRoute } from '@angular/router';
import { MenuModule } from 'primeng/menu';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

import { MultiSelectModule } from 'primeng/multiselect';
import { PlansService } from '../../services/plans.service';
import { ActivityService } from '../../services/activity.service';


@Component({
  selector: 'app-update-activity',
  standalone: true,
  imports: [CardModule,RadioButtonModule,CheckboxModule,ChipModule,InputNumberModule,ToastModule,MultiSelectModule,CalendarModule,DragDropModule,ButtonModule,GalleriaModule,FileUploadModule,InputTextareaModule,DropdownModule,InputTextModule,DialogModule,CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule ],
  providers: [MessageService],
  templateUrl: './update-activity.component.html',
  styleUrl: './update-activity.component.css'
})
export class UpdateActivityComponent {
    // images: any[] = [];
  images: string = '';

  draggedImage: any;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  // onImageSelect(event: any) {
  //   for (let file of event.files) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.images.push(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
  loading: boolean = false;

  onImageSelect(event: any) {
    this.loading=true;
    for (let file of event.files) {
      this.activityService.uploadImage(file).subscribe(
        (response: any) => {
          // Assuming the API returns a URL to the uploaded image
          const imageUrl = response[0].file_Path;
          console.log(imageUrl)
          // this.images.push(imageUrl);
          this.images=imageUrl;
          console.log(this.images)
          this.loading = false;
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }



  // removeImage(index: number) {
  //   this.images.splice(index, 1);
  // }
  removeImage() {
    this.images='';
  }

  onDragStart(event: any, img: any) {
    this.draggedImage = img;
  }

  // onDrop(event: any, index: number) {
  //   if (this.draggedImage) {
  //     const draggedIndex = this.images.indexOf(this.draggedImage);
  //     this.images.splice(draggedIndex, 1);
  //     this.images.splice(index, 0, this.draggedImage);
  //     this.draggedImage = null;
  //   }
  // }

  onDragEnd(event: any) {
    this.draggedImage = null;
  }

  onDragEnter(event: any, index: number) {
    // Optional: Handle visual effects for drag over
  }

/////////////////////////////////////////////////////////////////


  activityTypes = [
    { label: 'Course', value: 'course' },
    { label: 'Event', value: 'event' },
    { label: 'Workshop', value: 'workshop' },
    { label: 'Consultant Sessions', value: 'consultant' },
  ];

  selectedActivityType: any; 

  location:string=''
////////////////////////////////////////////////////////////////////////////////////////
  
  items: any[] = [];
  title:string=''

 
 
discription:string=''

activityId: any;
activityType: string | null = null;
  constructor(private route: ActivatedRoute,private activityService:ActivityService,private messageService: MessageService,private plansService: PlansService) {}
  ngOnInit() {

    this.activityId = this.route.snapshot.paramMap.get('id');
    this.activityType = this.route.snapshot.paramMap.get('type');

    console.log('Activity ID:', this.activityId);
    console.log('Activity Type:', this.activityType);


    this.items = [
      { label: 'Community Club', routerLink: '/dashboard' },

      { label: 'Activities', routerLink: '/activities' },


      { label: 'Update Activity', routerLink: `/update-activity/${this.activityId}/${this.activityType}` },
      
    ];
  this.getDetailsActivity() 
    
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
updateCourseDetails(courseDetails: any): void {
  this.selectedActivityType={ label: 'Course', value: 'course' },
   
  this.title = courseDetails.course_Name || '';
  this.discription = courseDetails.course_Description || '';
  this.location = courseDetails.course_Location || '';
  this.displayOnApp = courseDetails.dispaly_Home || false; // Convert to boolean if needed
  this.videoLink = courseDetails.video_Link || '';
  this.images = courseDetails.course_Image || '';

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
updateConsultDetails(consultDetails: any): void {

  
  this.selectedActivityType={ label: 'Consultant Sessions', value: 'consultant' },

  this.title = consultDetails.consult_Name || '';
  this.discription = consultDetails.consult_Description || '';
  this.location = consultDetails.consult_Location || '';
  this.displayOnApp = consultDetails.dispaly_Home || false;
  this.videoLink = consultDetails.video_Link || '';
  this.images = consultDetails.consult_Image || '';
  
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

////update values///
updateEventDetails(eventDetails: any): void {
 
  this.selectedActivityType={ label: 'Event', value: 'event' },
   



  this.title = eventDetails.event_Name || '';
  this.discription = eventDetails.event_Description || '';
  this.location = eventDetails.event_Location || '';
  this.displayOnApp = eventDetails.dispaly_Home ? 'yes' : 'no';
  this.videoLink = eventDetails.video_Link || '';
  this.images = eventDetails.event_Image || '';
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


 
  this.selectedActivityType={ label: 'Workshop', value: 'workshop' },
  
  this.title = workshopDetails.workshop_Name || '';
  this.discription = workshopDetails.workshop_Description || '';
  this.location = workshopDetails.workshop_Location || '';
  this.displayOnApp = workshopDetails.dispaly_Home || false; // Convert to boolean if needed
  this.videoLink = workshopDetails.video_Link || '';
  this.images = workshopDetails.workshop_Image || '';

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

/////////
///////////////////////////////////////////////////////////////////////////////////////////


  onActivityTypeChange(event: any): void {
    console.log('Selected Activity Type:', event.value);
    this.resetCourseValues()
    this.resetWorkshopData()
    this.resetEventData()
    this.clearConsultData()


    

    // Example logic based on the selected type
    switch (event.value.value) {
      case 'course':
        console.log('Course selected. Perform course-specific logic.');
        // Add your logic for 'course' here
        break;
      case 'event':
        console.log('Event selected. Perform event-specific logic.');
        // Add your logic for 'event' here
        break;
      case 'workshop':
        console.log('Workshop selected. Perform workshop-specific logic.');
        // Add your logic for 'workshop' here
        break;
      case 'consultant':
        console.log('Consultant Sessions selected. Perform specific logic.');
        // Add your logic for 'consultant_sessions' here
        break;
      default:
        console.log('No valid activity type selected.');
    }
  }
 

  
/////////////////////////////add new course ////////////////////////////////////////////
seatsAvailable: number | null = null;
startDate: any;
endDate: any;
displayOnApp: any = 'no';

sessions = [
  { session_Title: '', session_Date: null, start_Time: null, end_Time: null, session_Link: '',has_Published:true,addVideo: 'no' }
];

// إضافة سيشن جديد
addNewSession() {
  this.sessions.push({ session_Title: '', session_Date: null, start_Time: null, end_Time: null, session_Link: '' ,has_Published:true,addVideo: 'no' });
}

// حذف سيشن
deleteSession(index: number) {
  this.sessions.splice(index, 1);
}

addVideo: string = 'no';  
videoLink: string = '';


///////////////////////////////////////////////event ///////////////////////////////////////////
eventDate:any;
 
startTime: any;
endTime: any;
// displayOnHomeScreen: string = 'no';

/////////////////////////////////////////////////consultant///////////////////////////////////////////
days = [
  { name: 'Saturday', selected: false, startTime: null, endTime: null, seats: 0 ,duration:0},
  { name: 'Sunday', selected: false, startTime: null, endTime: null, seats: 0,duration:0 },
  { name: 'Monday', selected: false, startTime: null, endTime: null, seats: 0 ,duration:0},
  { name: 'Tuesday', selected: false, startTime: null, endTime: null, seats: 0,duration:0 },
  { name: 'Wednesday', selected: false, startTime: null, endTime: null, seats: 0,duration:0 },
  { name: 'Thursday', selected: false, startTime: null, endTime: null, seats: 0,duration:0 },
  { name: 'Friday', selected: false, startTime: null, endTime: null, seats: 0,duration:0 },
];

sessionsDays:any[]= []

// updatesSessionsDays():void{
//   this.sessionsDays=[]
//   this.days.forEach((day)=>{
//     if(day.selected){
//       if (day.startTime && day.endTime && day.duration) {
        
//         let sTime: any = day.startTime;
//         let eTime: any = day.endTime;
      
//         const startTime = new Date(sTime.getTime() - sTime.getTimezoneOffset() * 60000).toISOString();
//         const endTime = new Date(eTime.getTime() - eTime.getTimezoneOffset() * 60000).toISOString();
      
 
//         const startHour = new Date(sTime).getHours();
//         const startMinute = new Date(sTime).getMinutes();
//         const endHour = new Date(eTime).getHours();
//         const endMinute = new Date(eTime).getMinutes();
      
//         const totalWorkingMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
//         const workingHours = totalWorkingMinutes / 60;  
      
 
//         const availableSeats = Math.floor((workingHours * 60) / day.duration);
//         day.seats=availableSeats
//         console.log('Start Time:', startTime);
//         console.log('End Time:', endTime);
//         console.log('Working Hours:', workingHours);
//         console.log('Available Seats:', Math.floor(availableSeats)); 
//       }
 
      
//       this.sessionsDays.push({
//         session_Day: day.name,
//         session_Start_Time: day.startTime,
//         session_End_Time: day.endTime,
//         session_Duration: day.duration,
//         has_Published: true,
//       })
//     }
//   })
// }

updatesSessionsDays(): void {
  this.sessionsDays = [];
  this.days.forEach((day) => {
    if (day.selected) {
      if (day.startTime && day.endTime && day.duration) {
        const formatTime = (time: Date): string => {
          const options: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // Ensures the output is in 12-hour format (e.g., 10:30 am)
          };
          return new Date(time).toLocaleTimeString('en-US', options);
        };

        const formattedStartTime = formatTime(day.startTime);
        const formattedEndTime = formatTime(day.endTime);

        // Calculate available seats (unchanged logic)
        const startHour = new Date(day.startTime).getHours();
        const startMinute = new Date(day.startTime).getMinutes();
        const endHour = new Date(day.endTime).getHours();
        const endMinute = new Date(day.endTime).getMinutes();
        const totalWorkingMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
        const workingHours = totalWorkingMinutes / 60; // Convert to hours
        const availableSeats = Math.floor((workingHours * 60) / day.duration);

        day.seats = availableSeats;

        // Add the formatted data to sessionsDays
        this.sessionsDays.push({
          session_Day: day.name,
          session_Start_Time: formattedStartTime, // Use formatted time
          session_End_Time: formattedEndTime,     // Use formatted time
          session_Duration: day.duration,
          has_Published: true,
        });

        console.log('Start Time:', formattedStartTime);
        console.log('End Time:', formattedEndTime);
        console.log('Available Seats:', availableSeats);
      }
    }
  });
}

  

//////////////////////////////////////////////////submit activities functions///////////////////////////////////////////

///add course///
removeLastPripertyFromSessions(){
  this.sessions.forEach(session => {
    const keys=Object.keys(session) as Array<keyof typeof session>;
    const lastKey=keys[keys.length-1]
    if(lastKey){
      delete session[lastKey]
    }
  })

  const formatTime = (time: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Ensures 12-hour format with am/pm
    };
    return new Date(time).toLocaleTimeString('en-US', options);
  };
  
  // const startTime = formatTime(this.startTime); 
  // const endTime = formatTime(this.endTime);    
  
  // console.log('Start Time:', startTime);  
  // console.log('End Time:', endTime);     

  this.sessions.forEach((session: any) => {
    // تعديل session_Date
    if (session.session_Date) {
      session.session_Date = new Date(
        new Date(session.session_Date).getTime() - new Date(session.session_Date).getTimezoneOffset() * 60000
      ).toISOString();
    }
  
    // تعديل start_Time
    if (session.start_Time) {
      session.start_Time =formatTime(session.start_Time)
      
    }
  
    // تعديل end_Time
    if (session.end_Time) {
      session.end_Time = formatTime(session.end_Time)
    }
  });
  
}
resetCourseValues(): void {
  this.title = '';
  this.discription = '';
  this.location = '';
  this.displayOnApp = 'no';
  // this.images = '';
  this.videoLink = '';
  this.startDate = null;
  this.endDate = null;
  this.seatsAvailable = 0;

  // Reset sessions array to its initial state
  this.sessions = [
    { 
      session_Title: '', 
      session_Date: null, 
      start_Time: null, 
      end_Time: null, 
      session_Link: '', 
      has_Published: true, 
      addVideo: 'no' 
    }
  ];
}


addCourse(){

  if(this.displayOnApp==='yes'){
       this.displayOnApp=true
  }else if(this.displayOnApp==='no'){
    this.displayOnApp=false
      
  }

  const startDate = new Date(this.startDate.getTime() - this.startDate.getTimezoneOffset() * 60000).toISOString();
  const endDate = new Date(this.endDate.getTime() - this.endDate.getTimezoneOffset() * 60000).toISOString();


this.removeLastPripertyFromSessions();
console.log(this.sessions)
  const courseData = {
    course_Name: this.title,
    course_Description: this.discription,
    course_Location: this.location,
    dispaly_Home: this.displayOnApp,
    has_Published: false,
    course_Image: this.images,
    video_Link: this.videoLink,
    course_Start_Date:startDate  ,
    course_End_Date: endDate,
    availiable_Seats: this.seatsAvailable,
    sessions:this.sessions
  };
  console.log(courseData)
  this.activityService.addNewCourse(courseData).subscribe({
    next:(response)=>{
      console.log('Course added successfully', response);
      this.messageService.add({ severity: 'success', summary:'Success', detail:response.message });
      this.resetCourseValues();
    },
    error:(error)=>{
      console.error('Error adding course', error);
      this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });

    }
  })
}

///add workshop///
addWorkshop() {


  if(this.displayOnApp==='yes'){
    this.displayOnApp=true
}else if(this.displayOnApp==='no'){
 this.displayOnApp=false
   
}

const startDate = new Date(this.startDate.getTime() - this.startDate.getTimezoneOffset() * 60000).toISOString();
const endDate = new Date(this.endDate.getTime() - this.endDate.getTimezoneOffset() * 60000).toISOString();


this.removeLastPripertyFromSessions();


  const  workshopData = {
    workshop_Name: this.title,
    workshop_Description:this.discription,
    workshop_Location: this.location,
    has_Published: false,
    dispaly_Home: this.displayOnApp,
    workshop_Image: this.images,
    video_Link: this.videoLink,
    workshop_Start_Date: startDate,
    workshop_End_Date: endDate,
    available_Seats: this.seatsAvailable,
    sessions:this.sessions
  };

  console.log(workshopData)

  this.activityService.addNewWorkshop(workshopData).subscribe({
    next: (response) => {
      console.log('Workshop added successfully', response);
      this.messageService.add({ severity: 'success', summary:'Success', detail:response.message });
      this.resetWorkshopData()

    },
    error: (error) => {
      console.error('Error adding workshop', error);
      this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });

    }
  });
}


resetWorkshopData() {
  this.title = '';
  this.discription = '';
  this.location = '';
  this.displayOnApp = 'no'; // or `true` if default is true
  // this.images = '';
  this.videoLink = '';
  this.startDate = null;
  this.endDate = null;
  this.seatsAvailable = 0; // or set a default value
  this.sessions = [
    {
      session_Title: '',
      session_Date: null,
      start_Time: null,
      end_Time: null,
      session_Link: '',
      has_Published: true,
      addVideo: 'no'
    }
  ];
}



/////////add event ///
addEvent() {

  if(this.displayOnApp==='yes'){
    this.displayOnApp=true
}else if(this.displayOnApp==='no'){
 this.displayOnApp=false
   
}

const formatTime = (time: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Ensures 12-hour format with am/pm
  };
  return new Date(time).toLocaleTimeString('en-US', options);
};

const startTime = formatTime(this.startTime); // Formatted start time
const endTime = formatTime(this.endTime);     // Formatted end time

console.log('Start Time:', startTime); // For debugging
console.log('End Time:', endTime);     // For debugging

// const startTime = new Date(this.startTime.getTime() - this.startTime.getTimezoneOffset() * 60000).toISOString();
// const endTime = new Date(this.endTime.getTime() - this.endTime.getTimezoneOffset() * 60000).toISOString();
const eventDate = new Date(this.eventDate.getTime() - this.eventDate.getTimezoneOffset() * 60000).toISOString();



  const eventData = {
    event_Name: this.title,
    event_Description: this.discription,
    event_Location: this.location,
    dispaly_Home:  this.displayOnApp,
    has_Published: false,
    video_Link: this.videoLink,
    event_Image:this.images,
    event_Date: eventDate ,
    event_Start_Time: startTime,
    event_End_Time: endTime,
    availabile_Seats:this.seatsAvailable
  };


  console.log(eventData)

  this.activityService.addNewEvent(eventData).subscribe({
    next: (response) => {
      console.log('Event added successfully:', response);
      this.messageService.add({ severity: 'success', summary:'Success', detail:response.message });

      this.resetEventData()
    },
    error: (error) => {
      console.error('Error adding event:', error);
      this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });

    }
  });
}


resetEventData() {
  this.title = '';
  this.discription = '';
  this.location = '';
  this.displayOnApp = 'no';
  this.videoLink = '';
  // this.images = '';
  this.eventDate = null;
  this.startTime = null;
  this.endTime = null;
  this.seatsAvailable = 0;
}

////add consultant///

addConsult(): void {
  this.updatesSessionsDays();
console.log(this.sessionsDays);

  if(this.displayOnApp==='yes'){
    this.displayOnApp=true
}else if(this.displayOnApp==='no'){
 this.displayOnApp=false
   
}

  const consultData = {
    consult_Name: this.title,
    consult_Description: this.discription,
    consult_Location: this.location,
    has_Published: false,
    dispaly_Home: this.displayOnApp,
    video_Link: this.videoLink,
    consult_Image: this.images,
    sessions:this.sessionsDays
  };

  this.activityService.addNewConsult(consultData).subscribe({
    next: (response) => {
      console.log('Consult added successfully', response);
      this.messageService.add({ severity: 'success', summary:'Success', detail:response.message });
      this.clearConsultData()
   
    },
    error: (error) => {
      console.error('Error adding consult', error);
      this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });

    },
  });
}

clearConsultData(): void {
  this.title = '';
  this.discription = '';
  this.location = '';
  this.displayOnApp = false;
  this.videoLink = '';
 
  this.sessionsDays = [];
   
}


submitSelectedActivity(){

  if (!this.validateActivitiesFields()) {
    return; // Stop submission if validation fails
  }


  switch (this.selectedActivityType?.value) {
    case 'course':
      this.addCourse()
      console.log('Course selected. Perform course-specific logic.');
      // Add your logic for 'course' here
      break;
    case 'event':
      this.addEvent()
      console.log('Event selected. Perform event-specific logic.');
      // Add your logic for 'event' here
      break;
    case 'workshop':
      this.addWorkshop()
      console.log('Workshop selected. Perform workshop-specific logic.');
      // Add your logic for 'workshop' here
      break;
    case 'consultant':
      this.addConsult()
      console.log('Consultant Sessions selected. Perform specific logic.');
      // Add your logic for 'consultant_sessions' here
      break;
    default:
      console.log('No valid activity type selected.');
  }
}


//////////////////validateActivitiesFields////////////////
validateActivitiesFields():boolean{
  const errors:string[]=[];

  //common validate
  if(!this.title) errors.push('Title is requuired.');
  if (!this.discription) errors.push('Description is required.');
  if (!this.location) errors.push('Location is required.');
  // if (!this.selectedActivityType) errors.push('Type is required.');


  //Specific validation based on the activity type
  switch (this.selectedActivityType?.value){
     
    case 'course':
      if (!this.startDate) errors.push('Start Date is required.');
      if (!this.endDate) errors.push('End Date is required.');
      if (!this.seatsAvailable) errors.push('Seats Available is required.');
      if(this.sessions.some(session => !session.session_Title || !session.session_Date || !session.start_Time || !session.end_Time)){
        errors.push('All session details are required for courses.');
      }
      break;

      case 'event':
        if (!this.eventDate) errors.push('Event Date is required.');
        if (!this.startTime) errors.push('Start Time is required.');
        if (!this.endTime) errors.push('End Time is required.');
        if (!this.seatsAvailable) errors.push('Seats Available is required.');
        break;

      case 'workshop':
          if (!this.startDate) errors.push('Start Date is required.');
          if (!this.endDate) errors.push('End Date is required.');
          if (!this.seatsAvailable) errors.push('Seats Available is required.');
          if (this.sessions.some(session => !session.session_Title || !session.session_Date || !session.start_Time || !session.end_Time)) {
            errors.push('All session details are required for workshops.');
          }
          break; 
          
          case 'consultant':
            if (this.days.every(day => !day.selected)) errors.push('At least one day must be selected for consultant sessions.');
            if (this.days.some(day => day.selected && (!day.startTime || !day.endTime || !day.duration))) {
              errors.push('Complete all session details for selected days.');
            }
            break;
      
          default:
            errors.push('Please select a valid activity type.');  

           
  }


  if (errors.length > 0) {
    errors.forEach(error => this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: error }));
    return false;
  }

  return true;
}
 
}
