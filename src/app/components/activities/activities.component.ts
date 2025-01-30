import {ChangeDetectionStrategy, Component,HostListener,forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';  // Provides ngIf, ngFor
import { FormsModule } from '@angular/forms';    // Provides ngModel, form directives

 
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { NgClass } from '@angular/common';
 
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
 
 
import { Menu } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { PlansService } from '../../services/plans.service';
import { CalendarModule } from 'primeng/calendar';
 
import { CheckboxModule } from 'primeng/checkbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ActivityService } from '../../services/activity.service';
import { RouterModule } from '@angular/router';
 

 

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [RouterModule,CheckboxModule,OverlayPanelModule, CalendarModule,ReactiveFormsModule,PaginatorModule,BreadcrumbModule,CommonModule, DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],

  providers: [MessageService ],

  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  items:any[]=[];

  globalFilter: string = '';
  subscriptions: any[] = [];
  paymentRecords: any[] = [];

  status: { label: string; value: string; class: string; selected: boolean;  }[] = [
    { label: 'All', value: 'all', class: 'custom-button-add', selected: false   },
    { label: 'Workshop', value: 'workshop', class: 'p-tag-purble', selected: false  },
    { label: 'Course', value: 'course', class: 'p-tag-info', selected: false  },
    { label: 'Consultant', value: 'consultant', class: 'p-tag-danger', selected: false  },
    { label: 'Event', value: 'event', class: 'p-tag-success', selected: false  },

  ];
  

  //////////////////////activities////////////////////
  activityTabs = [
    { label: 'All', icon: 'pi pi-list', value: 'all' },
    { label: 'Courses', icon: 'pi pi-book', value: 'course' },
    { label: 'Workshop', icon: 'pi pi-cog', value: 'workshop' },
    { label: 'Events', icon: 'pi pi-calendar', value: 'event' },
    { label: 'Consultant', icon: 'pi pi-users', value: 'consultant' }
  ];

  activities = [
    { title: 'Learn German: Beginner Level', type: 'Course', typeClass: 'p-tag-info', startDate: new Date(2025, 1, 12), endDate: new Date(2025, 1, 20), seatsAvailable: '5 Seat leave', bookings: '30/35',status: 'Published' },
    { title: 'Learn German: Beginner Level', type: 'Workshop', typeClass: 'p-tag-purble', startDate: new Date(2025, 1, 12), endDate: new Date(2025, 1, 20), seatsAvailable: '5 Seat leave', bookings: '30/35',status: 'Not Publish' },
    { title: 'Learn German: Beginner Level', type: 'Event', typeClass: 'p-tag-success', startDate: new Date(2025, 1, 12), endDate: new Date(2025, 1, 20), seatsAvailable: '5 Seat leave', bookings: '30/35',status: 'Published' },
    { title: 'Learn German: Beginner Level', type: 'Consultant', typeClass: 'p-tag-danger', startDate: new Date(2025, 1, 12), endDate: new Date(2025, 1, 20), seatsAvailable: '5 Seat leave', bookings: '30/35' ,status: 'Not Publish'},
  ];


  courses = [
    {
      courseTitle: "Learn German: Beginner Level",
      sessionNumber: "5 Sessions",
      startDate: "Feb 12, 2025",
      endDate: "Feb 20, 2025",
      seatsAvailable: "5 Seat leave",
      bookings: "30/35",
      status: "Published",
    },
    {
      courseTitle: "Learn German: Beginner Level",
      sessionNumber: "5 Sessions",
      startDate: "Feb 12, 2025",
      endDate: "Feb 20, 2025",
      seatsAvailable: "5 Seat leave",
      bookings: "30/35",
      status: "Not Publish",
    },
    {
      courseTitle: "Learn German: Beginner Level",
      sessionNumber: "5 Sessions",
      startDate: "Feb 12, 2025",
      endDate: "Feb 20, 2025",
      seatsAvailable: "5 Seat leave",
      bookings: "30/35",
      status: "Published",
    },
    {
      courseTitle: "Learn German: Beginner Level",
      sessionNumber: "5 Sessions",
      startDate: "Feb 12, 2025",
      endDate: "Feb 20, 2025",
      seatsAvailable: "5 Seat leave",
      bookings: "30/35",
      status: "Not Publish",
    },
    {
      courseTitle: "Learn German: Beginner Level",
      sessionNumber: "5 Sessions",
      startDate: "Feb 12, 2025",
      endDate: "Feb 20, 2025",
      seatsAvailable: "5 Seat leave",
      bookings: "30/35",
      status: "Published",
    },
  ];
  

 
  


  constructor(private messageService:MessageService,private activityService:ActivityService,private plansService: PlansService) {
   

    this.paymentRecords = [
      {
        name: 'Ahmed Ali',
        email: 'Ahmed.Ali@gmail.com',
        phone: '+49 128 45987564',
        date: 'Feb 12, 2025',
        planType: 'Annual',
        amount: 480,
        paymentBy: 'Cash',
        paymentByIcon: 'assets/icons/cash.svg',
        status: 'Success',
      },
      {
        name: 'Ahmed Ali',
        email: 'Ahmed.Ali@gmail.com',
        phone: '+49 128 45987564',
        date: 'Feb 12, 2025',
        planType: 'Free Trial Month',
        amount: null,
        paymentBy: 'Stripe',
        paymentByIcon: 'assets/icons/stripe.svg',
        status: 'Failed',
      },
      {
        name: 'Ahmed Ali',
        email: 'Ahmed.Ali@gmail.com',
        phone: '+49 128 45987564',
        date: 'Feb 12, 2025',
        planType: 'Monthly',
        amount: 480,
        paymentBy: 'MasterCard',
        paymentByIcon: 'assets/icons/mastercard.svg',
        status: 'Pending',
      },
      {
        name: 'Ahmed Ali',
        email: 'Ahmed.Ali@gmail.com',
        phone: '+49 128 45987564',
        date: 'Feb 12, 2025',
        planType: 'Free Trial Month',
        amount: null,
        paymentBy: 'Visa',
        paymentByIcon: 'assets/icons/visa.svg',
        status: 'Success',
      },
    ];
  }


  ngOnInit() {

    // this.adjustDialogStyle(window.innerWidth);


    this.items = [
      { label: 'Community Club', routerLink: '/dashboard' },

      { label: 'Activities', routerLink: '/activities' },
      
    ];

    
  this.fetchActivities('All',1,2000)
    
  }


  getPlanBadgeClass(planType: string): string {
    switch (planType) {
      case 'Monthly':
        return 'badge-monthly'; // كلاس خاص بـ Monthly
      case 'Semi-Annual':
        return 'badge-semi-annual'; // كلاس خاص بـ Semi-Annual
      case 'Annual':
        return 'badge-annual'; // كلاس خاص بـ Annual
      case 'Free Trial Month':
        return 'badge-free-trial'; // كلاس خاص بـ Free Trial Month
      default:
        return 'badge-default'; // كلاس افتراضي
    }
  }
  
  getPlanIcon(planType: string): string {
    switch (planType) {
      case 'Monthly':
        return 'pi pi-user'; // أيقونة خاصة بـ Monthly
      case 'Semi-Annual':
        return 'pi pi-calendar'; // أيقونة خاصة بـ Semi-Annual
      case 'Annual':
        return 'pi pi-star'; // أيقونة خاصة بـ Annual
      case 'Free Trial Month':
        return 'pi pi-gift'; // أيقونة خاصة بـ Free Trial Month
      default:
        return 'pi pi-question'; // أيقونة افتراضية
    }

    
  }
  
  currentPage:any;
  pageChange(event: any): void {
    this.currentPage = event.page;
    console.log(`Current Page: ${this.currentPage}`);
  }

  ////////////////////////plan list//////////////////////////
 

//////////////////////////////////////////////filter //////////////////////////////////////////

displayFilter: boolean = false;

// Plan Types
planTypes = [
  { label: 'All', selected: true },
  { label: 'Annual', selected: false },
  { label: 'Semi-Annual', selected: false },
  { label: 'Monthly', selected: false },
  { label: 'Free Trial', selected: false }
];

selectedDate: Date | null = null;

 

togglePlanType(type: any): void {
  // إذا كنت تريد السماح باختيار زر واحد فقط:
  // this.planTypes.forEach((t) => (t.selected = false));  
  // type.selected = true;  

  // إذا كنت تريد السماح باختيار أزرار متعددة، قم بإزالة التعليق:
  type.selected = !type.selected;
}

toggleStatus(type: any): void {
  // Toggle selection
  type.selected = !type.selected;

  // If 'All' is selected, deselect others
  if (type.value === 'all') {
    this.status.forEach((t) => {
      if (t.value !== 'all') {
        t.selected = false;
      }
    });
  } else {
    // If any other status is selected, deselect 'All'
    const allStatus = this.status.find((t) => t.value === 'all');
    if (allStatus) {
      allStatus.selected = false;
    }
  }
}


openFilterDialog(): void {
  this.displayFilter = true;
}

closeFilterDialog(): void {
  this.displayFilter = false;
}

applyFilters(): void {
  // Gather the filters
  const selectedPlanType = this.planTypes.find((type) => type.selected)?.label;
  const selectedDateRange = this.selectedDate;

  console.log('Filters applied:', {
    planType: selectedPlanType,
    dateRange: selectedDateRange
  });

  // Close the dialog after applying filters
  this.closeFilterDialog();
}


///////////////////////////////////////////////width dialog////////////////////////////////////
 
// dialogStyle: { [key: string]: string } = { width: '40vw' };

 

// @HostListener('window:resize', ['$event'])
// onResize(event: any): void {
//   this.adjustDialogStyle(event.target.innerWidth);  
// }

// private adjustDialogStyle(screenWidth: number): void {
//   this.dialogStyle = screenWidth <= 768 ? { width: '100vw' } : { width: '40vw' };
// }
/////////////filter success////////////////////////////////////
displayReminder: boolean = false;

  showReminder() {
    this.displayReminder = true;
  }

///////////////////////////payment dropdown/////////////////////////
 // List of payment methods
 paymentMethods = [
  { name: 'VISA', value: 'visa', image: 'visaDrop.svg' },
  { name: 'Stripe', value: 'stripe', image: 'stripePay.svg' },
  { name: 'MasterCard', value: 'mastercard', image: 'mastercardPay.svg' },
  { name: 'PayPal', value: 'paypal', image: 'paypal.svg' },
  { name: 'Cash', value: 'cash', image: 'cashPay.svg' }
];

// Selected payment method
selectedPayment: any = null;

/////////////////////////////status activity ////////////////////////
getSeverity(status: string): string {
  switch (status) {
    case 'Published':
      return 'success';
    case 'Not Publish':
      return 'danger';
    default:
      return 'warning';
  }
}

getIcon(status: string): string {
  switch (status) {
    case 'Published':
      return 'pi pi-check-circle'; // PrimeIcons for success
    case 'Not Publish':
      return 'pi pi-times-circle'; // PrimeIcons for danger
    default:
      return 'pi pi-exclamation-circle'; // PrimeIcons for warning
  }
}


viewParticipants(activity: any) {
  console.log('View Participants:', activity);
}

viewDetails(activity: any) {
  console.log('View Details:', activity);
}

 


//////////////////////////////////////////dialog success publish//////////////////////////////
showPublishDialog: boolean = false;

// Function to open the dialog
openPublishDialog() {
  this.showPublishDialog = true;
}

// Function to handle cancel action
onCancel() {
  this.showPublishDialog = false;
}

// Function to handle confirm action
onConfirm() {
  this.showPublishDialog = false;
  console.log('Course published successfully!');
  // Add your logic to publish the course here
}

///////////////////////////////////cancel consultant////////////////////////////////////////
showCancelDialog: boolean = false;

  // Example session data
  sessions = [
    { day: 'Saturday', time: '10:00 AM - 12:00 PM', bookings: '15 Booking', duration: 'Session duration: 30 min', selected: false },
    { day: 'Saturday', time: '10:00 AM - 12:00 PM', bookings: '15 Booking', duration: 'Session duration: 30 min', selected: false },
    { day: 'Saturday', time: '10:00 AM - 12:00 PM', bookings: '15 Booking', duration: 'Session duration: 30 min', selected: false }
  ];

  // Function to open the dialog
  openCancelDialog() {
    this.showCancelDialog = true;
  }

 

  toggleSessionSelection(index: number): void {
    this.sessions[index].selected = !this.sessions[index].selected;
  }


  /////////////////////////fetching from api ///////////////////////////
  getActivityClass(activityType: string): string {
    switch (activityType) {
      case 'Courses':
        return 'p-tag-success'; // Green for success
      case 'Workshops':
        return 'p-tag-purble'; // Purple for workshops
      case 'Events':
        return 'p-tag-info'; // Blue for events
      case 'Consultant':
        return 'p-tag-danger'; // Red for consultant
      default:
        return ''; // Default class (if any)
    }
  }

  
  fetchActivities(type:string, pageNumber:number, pageSize:number):void{
     this.activityService.getPaginatedActivities(type,pageNumber,pageSize).subscribe({
      next:(response)=>{
        this.activities=response.data
        console.log('Activities:', this.activities);
      },
      error:(error)=>{
        console.log('Error fetching activities:', error);
      }
     })
  }


  activeIndex: number = 0;
  onTabChange(index: number): void {
    console.log('Active tab index changed:', index);
    this.activeIndex = index;
    if(index===0){
      this.fetchActivities('All',1,200);
    }else if(index===1){
      this.fetchActivities('Course',1,200);
    }else if(index===2){
      this.fetchActivities('Workshop',1,200);
      
    }else if(index===3){
       
      this.fetchActivities('Event',1,200);
      
    }else if(index===4){
      this.fetchActivities('Consult',1,200);
     
    }
  }



  ////////////////////////////////////////////apis delete//////////////////////
  deleteConsultById(consultId: string): void {
    this.activityService.deleteConsult(consultId).subscribe({
      next: (response) => {
        console.log('Consult deleted successfully:', response);
        this.messageService.add({ severity: 'success', summary:'Success', detail:response.message });
        this.onTabChange(4)
      },
      error: (error) => {
        console.error('Error deleting consult:', error);
        this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });

      }
    });
  }


  deleteCourseById(courseId: string): void {
    this.activityService.deleteCourse(courseId).subscribe({
      next: (response) => {
        console.log('Course deleted successfully:', response);
        this.messageService.add({ severity: 'success', summary:'Success', detail:response.message });
        this.onTabChange(1)
      },
      error: (error) => {
        console.error('Error deleting course:', error);
        this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });

      }
    });
  }


  deleteEventById(eventId: string): void {
    this.activityService.deleteEvent(eventId).subscribe({
      next: (response) => {
        console.log('Event deleted successfully:', response);
        this.messageService.add({ severity: 'success', summary:'Success', detail:response.message });
        this.onTabChange(3)
      },
      error: (error) => {
        console.error('Error deleting event:', error);
        this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });

      }
    });
  }


  deleteWorkshopById(workshopId: string): void {
    this.activityService.deleteWorkshop(workshopId).subscribe({
      next: (response) => {
        console.log('Workshop deleted successfully:', response);
        this.messageService.add({ severity: 'success', summary:'Success', detail:response.message });
        this.onTabChange(2)
      },
      error: (error) => {
        console.error('Error deleting workshop:', error);
        this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });

      }
    });
  }



  deleteItem(activity: any) {
    console.log('Delete Item:', activity);
    if(activity.activity_Type==="Courses"){
      this.deleteCourseById(activity.activity_ID)
   
    }else if(activity.activity_Type==="Events"){
      this.deleteEventById(activity.activity_ID)
       
    }else if(activity.activity_Type==="Workshops"){
      this.deleteWorkshopById(activity.activity_ID)
     

    }else if(activity.activity_Type==="Consultant"){
      this.deleteConsultById(activity.activity_ID)
       

      
    }
  }



  ////////////////////////////update activity//////////////////

 
}

