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
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SuccessDialogComponent } from '../../shared/components/success-dialog/success-dialog.component';
import { ReasonDialogComponent } from '../../shared/components/reason-dialog/reason-dialog.component';
 

 

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [ReasonDialogComponent,SuccessDialogComponent,ConfirmDialogComponent,RouterModule,CheckboxModule,OverlayPanelModule, CalendarModule,ReactiveFormsModule,PaginatorModule,BreadcrumbModule,CommonModule, DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],

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
      { label: 'Dashboard', routerLink: '/dashboard' },

      { label: 'Activities', routerLink: '/activities' },
      
    ];

    
  this.fetchActivities('All',1,2000)
    
  }
  

displayHome(id:any,type:any,publish:any){
  if(type==='Courses'){
    type='Course'
 }else if(type==='Events'){
   type='Event'

 }else if(type==='Workshops'){
   type='Workshop'
   
 }else if(type="Consultant"){
    
   type='Consult'
   
 } 

  this.activityService.displayHomeActivity(id, type, publish).subscribe(
    (response) => {
      this.messageService.add({ severity: 'success', summary:'Success', detail:response.message });
      console.log('Success:', response);

      // updated by nour
      this.showSuccess(
        publish
        ? `This ${type} Display on App Home Successfully`
        : `This ${type} Hidden from App Home Successfully`
      )
      // end update

      if(this.activeIndex===0){
        this.fetchActivities('All',1,2000);
      }else if(this.activeIndex===1){
        this.fetchActivities('Course',1,2000);
      }else if(this.activeIndex===2){
        this.fetchActivities('Workshop',1,2000);
        
      }else if(this.activeIndex===3){
         
        this.fetchActivities('Event',1,2000);
        
      }else if(this.activeIndex===4){
        this.fetchActivities('Consult',1,2000);
       
      }
    },
    (error) => {
      this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });
      console.error('Error:', error);
    }
  );

}
togglePublish(id:any,type:any,publish:any){

  if(type==='Courses'){
     type='Course'
  }else if(type==='Events'){
    type='Event'

  }else if(type==='Workshops'){
    type='Workshop'
    
  }else if(type="Consultant"){
     
    type='Consult'
    
  } 
  this.activityService.publishActivity(id, type, publish).subscribe(
    (response) => {
      this.messageService.add({ severity: 'success', summary:'Success', detail:response.message });
      console.log('Success:', response);

      // updated by nour
      this.actionState.activity.has_Published = publish;
      this.showSuccess(
        publish
        ? `The ${type} has been successfully published`
        : `The ${type} is now unpublished and no longer visible to users`
      )
      // end update

      if(this.activeIndex===0){
        this.fetchActivities('All',1,2000);
      }else if(this.activeIndex===1){
        this.fetchActivities('Course',1,2000);
      }else if(this.activeIndex===2){
        this.fetchActivities('Workshop',1,2000);
        
      }else if(this.activeIndex===3){
         
        this.fetchActivities('Event',1,2000);
        
      }else if(this.activeIndex===4){
        this.fetchActivities('Consult',1,2000);
       
      }
      
    },
    (error) => {
      this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });
      console.error('Error:', error);
    }
  );
}

// updated by nour
onConfirm() {
  const { type } = this.actionState;
  const { activity } = this.actionState;

  this.confirmDialog.visible = false;

  switch (type) {

    case 'publish':
      this.togglePublish(activity.activity_ID, activity.activity_Type, !activity.has_Published);
      break;

    case 'cancel':
      this.activityID = activity.activity_ID;
      this.activityType = 'cancel';
      this.reasonDialog.visible = true;
      this.reasonDialog.showDate = false;
      break;

    case 'postpone':
      this.activityID = activity.activity_ID;
      this.activityType = 'postpone';
      this.reasonDialog.visible = true;
      this.reasonDialog.showDate = true;
      break;
  }
}
// end update

getPlanBadgeClasss(planType: string): string {
  switch (planType) {
    case 'Monthly':
      return 'badge-monthly'; // كلاس خاص بـ Monthly
    case 'Semi-Annual':
      return 'badge-semi-annual'; // كلاس خاص بـ Semi-Annual
    case 'Annual':
      return 'badge-annual'; // كلاس خاص بـ Annual
    case 'Free Trial Month':
      return 'badge-free-trial'; 
      case 'Test 101':
        return 'badge-free-trial'; // كلاس خاص بـ Free Trial Month
    default:
      return 'badge-default'; // كلاس افتراضي
  }
}


getPlanBadgeClass(planType: string): string {
  if (!planType) return 'badge-default'; // Handle empty/null values

  const lowerPlanType = planType.toLowerCase(); // Convert to lowercase for case insensitivity

  if (lowerPlanType.includes('month')) return 'badge-monthly';
  if (lowerPlanType.includes('semi')) return 'badge-semi-annual';
  if (lowerPlanType.includes('annual')) return 'badge-annual';
  if (lowerPlanType.includes('free')) return 'badge-free-trial';
  if (lowerPlanType.includes('test 101')) return 'badge-free-trial';

  return 'badge-default'; // Default class if no match
}


getPlanIconn(planType: string): string {
  switch (planType) {
    case 'Monthly':
      return 'pi pi-user'; // أيقونة خاصة بـ Monthly
    case 'Semi-Annual':
      return 'pi pi-calendar'; // أيقونة خاصة بـ Semi-Annual
    case 'Annual':
      return 'pi pi-star'; // أيقونة خاصة بـ Annual
    case 'Free Trial Month':
      return 'pi pi-gift';
      case 'Test 101':
        return 'pi pi-gift';  
    default:
      return 'pi pi-question'; // أيقونة افتراضية
  }

  
}



getPlanIcon(planType: string): string {
  if (!planType) return 'pi pi-question'; // Handle empty/null values

  const lowerPlanType = planType.toLowerCase(); // Convert to lowercase

  if (lowerPlanType.includes('month')) return 'pi pi-user';
  if (lowerPlanType.includes('semi')) return 'pi pi-calendar';
  if (lowerPlanType.includes('annual')) return 'pi pi-star';
  if (lowerPlanType.includes('free')) return 'pi pi-gift';
  if (lowerPlanType.includes('test 101')) return 'pi pi-gift';

  return 'pi pi-question'; // Default icon if no match
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
  { name: 'Cash', value: 'cash', image: '/manage-subscription/cash.svg' }
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

// // Function to handle cancel action
// onCancel() {
//   this.showPublishDialog = false;
// }

// // Function to handle confirm action
// onConfirm() {
//   this.showPublishDialog = false;
//   console.log('Course published successfully!');
//   // Add your logic to publish the course here
// }

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
        return 'p-tag-info'; // Green for success
      case 'Workshops':
        return 'p-tag-purble'; // Purple for workshops
      case 'Events':
        return 'p-tag-success'; // Blue for events
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
      this.fetchActivities('All',1,2000);
    }else if(index===1){
      this.fetchActivities('Course',1,2000);
    }else if(index===2){
      this.fetchActivities('Workshop',1,2000);
      
    }else if(index===3){
       
      this.fetchActivities('Event',1,2000);
      
    }else if(index===4){
      this.fetchActivities('Consult',1,2000);
     
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

 visibleReason:boolean=false;
 reason:string=''
 activityType:string=''
 activityID:any
 toDate:any;
 showDate:boolean=false;
 showReason(id:any,action:string){
   this.visibleReason=true;
  this.activityType=action;
  this.activityID=id

  if(action==='postpone'){
    this.showDate=true;
  }else if(action==='cancel'){
    this.showDate=false;

  }
 }

 // updated by nour
 eventAction(reason: string, date?: Date){
  if(this.activityType==='cancel'){
    this.activityService.cancelEvent(this.activityID, reason).subscribe(
      (response) => {
      this.messageService.add({ severity: 'success', summary:'Success', detail:response.message });

        this.showSuccess(
          `This ${this.getEntityName(this.actionState.activity.activity_Type)} has been cancelled bec ${reason}`
        );
        this.reasonDialog.visible = false;
      // end update
      this.fetchActivities('Event',1,2000);
        
        console.log('Success:', response);
      },
      (error) => {
      this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });
        
        console.error('Error:', error);
      }
    );
  }else if(this.activityType==='postpone'){
  // updated by nour
    if (!date) {
      this.messageService.add({ severity: 'error', summary:'Failed', detail:'Date is required' });
      return;
    }

     const formattedDate = this.formatDate(date);
    // const date = new Date(this.toDate.getTime()-this.toDate.getTimezoneOffset() * 60000).toISOString();
    console.log(formattedDate)
    this.activityService.postponeEvent(this.activityID, reason, formattedDate).subscribe(
      (response) => {
        
        this.showSuccess(
          `This ${this.getEntityName(this.actionState.activity.activity_Type)} has been postponed to ${formattedDate} bec ${reason}`
        );

        this.reasonDialog.visible = false;
      // end update
      this.fetchActivities('Event',1,2000);

        console.log('Success:', response);
      this.messageService.add({ severity: 'success', summary:'Success', detail:response.message });

      },
      (error) => {
        this.showDate=false
      this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });
        
        console.error('Error:', error);
      }
    );
  }
 }


 customSortt(event: { data: any[], field: string, order: number }) {
  event.data.sort((a, b) => {
    let valueA = a[event.field];
    let valueB = b[event.field];

    // ✅ تحويل النصوص مثل "Mar 5, 2025" إلى تواريخ
    if (this.isValidDate(valueA) && this.isValidDate(valueB)) {
      console.log('i am string date')
      return (new Date(valueA).getTime() - new Date(valueB).getTime()) * event.order;
    }

    // ✅ التحقق مما إذا كانت القيم تواريخ
    if (this.isDate(valueA) && this.isDate(valueB)) {
      return (new Date(valueA).getTime() - new Date(valueB).getTime()) * event.order;
    }

    // ✅ التحقق مما إذا كانت القيم أرقامًا
    if (!isNaN(valueA) && !isNaN(valueB)) {
      return (valueA - valueB) * event.order;
    }

    // ✅ فرز النصوص (حساس للأحرف الكبيرة والصغيرة)
    return valueA.toString().localeCompare(valueB.toString()) * event.order;
  });
}

customSort(event: { data: any[], field: string, order: number }) {
  console.log(event)

  event.data.sort((a, b) => {
    let valueA = a[event.field];
    let valueB = b[event.field];

    console.log("Before Sorting:", valueA, valueB); // Debugging output

    // ✅ Handle null values properly
    if (valueA == null && valueB == null) return 0;
    if (valueA == null) return event.order;  // Null values should appear last in ascending order
    if (valueB == null) return -event.order; // Null values should appear first in descending order

    // ✅ Convert string dates (like "Mar 5, 2025") into Date objects for sorting
    if (this.isValidDate(valueA) && this.isValidDate(valueB)) {
      let dateA = new Date(valueA);
      let dateB = new Date(valueB);
      let result = (dateA.getTime() - dateB.getTime()) * event.order;

      console.log("Sorted Dates:", dateA, dateB, "Result:", result); // Debugging output

      return result;
    }


      // ✅ التحقق مما إذا كانت القيم تواريخ
      if (this.isDate(valueA) && this.isDate(valueB)) {
        return (new Date(valueA).getTime() - new Date(valueB).getTime()) * event.order;
      }


    // ✅ Handle numeric sorting
    if (!isNaN(valueA) && !isNaN(valueB)) {
      return (parseFloat(valueA) - parseFloat(valueB)) * event.order;
    }

    // ✅ Handle text sorting (case insensitive)
    return valueA.toString().localeCompare(valueB.toString(), undefined, { numeric: true }) * event.order;
  });

  console.log("After Sorting:", event.data.map(item => item[event.field])); // Debugging output after sorting
}




// ✅ دالة تتحقق مما إذا كانت القيمة تاريخًا
isDate(value: any): boolean {
  return !isNaN(Date.parse(value));
}
 

isValidDate(dateString: string): boolean {
  return dateString != null && !isNaN(Date.parse(dateString));
}

// updated by nour
actionState: {
  type: 'publish' | 'display' | 'cancel' | 'postpone' | null;
  activity?: any;
  value?: boolean | null; // publish / display
} = {
  type: null,
  activity: null
};

confirmDialog = {
  visible: false,
  message: '',
  icon: ''
};

successDialog = {
  visible: false,
  message: '',
  icon: ''
};

reasonDialog = {
  visible: false,
  title: '',
  showDate: false
};

handleAction(type: 'publish' | 'display' | 'cancel' | 'postpone', activity: any, value?: boolean) {
  this.actionState = { type, activity, value };

  switch (type) {

    case 'publish':
      this.openConfirm(
        value!
          ? `Are you sure you want to publish this ${this.getEntityName(activity.activity_Type)}?`
          : `This ${this.getEntityName(activity.activity_Type)} will no longer be visible to users. Are you sure?`,
        value ? 'publishCourse.svg' : '/activities/warning.svg'
      );
      break;

    // case 'display':
    //   this.executeDisplay();
    //   break;

    case 'cancel':
      this.openConfirm(
        `Are you sure you want to cancel the event?`,
        '/activities/warning.svg'
      );
      break;

    case 'postpone':
      this.openConfirm(
        `Are you sure you want to postpone the event?`,
        '/activities/postpone.svg'
      );
      break;
  }
}

// handleAction(type: 'publish' | 'display' | 'cancel' | 'postpone', activity: any, value?: boolean) {
//   this.actionState = { type, activity, value };

//   switch (type) {

//     case 'publish':
//       this.openConfirm(
//         value!
//           ? `Are you sure you want to publish this ${this.getEntityName(activity.activity_Type)}?`
//           : `This ${this.getEntityName(activity.activity_Type)} will no longer be visible to users. Are you sure?`,
//         value ? 'publishCourse.svg' : '/activities/warning.svg'
//       );
//       break;

//     case 'display':
//       this.executeDisplay();
//       break;

//     case 'cancel':
//       this.openConfirm(
//         `Are you sure you want to cancel the event?`,
//         '/activities/warning.svg'
//       );
//       break;

//     case 'postpone':
//       this.openConfirm(
//         `Are you sure you want to postpone the event?`,
//         '/activities/postpone.svg'
//       );
//       break;
//   }
// }

openConfirm(message: string, icon: string) {
  this.confirmDialog = {
    visible: true,
    message,
    icon
  };
}

// onConfirm() {
//   const { type } = this.actionState;

//   this.confirmDialog.visible = false;

//   switch (type) {

//     // case 'publish':
//     //   this.executePublish();
//     //   break;

//     case 'cancel':
//       this.openReasonDialog('cancel');
//       break;

//     case 'postpone':
//       this.openReasonDialog('postpone');
//       break;
//   }
// }

onCancel() {
  this.confirmDialog.visible = false;
  this.resetState();
}

executePublish() {
  const { activity, value } = this.actionState;
  const mappedType = this.mapType(activity.activity_Type);

  this.activityService.publishActivity(activity.activity_ID, mappedType, value!).subscribe({
    next: () => {

      activity.has_Published = value;

      this.showSuccess(
        value
          ? `The ${this.getEntityName(activity.activity_Type)} has been successfully published`
          : `The ${this.getEntityName(activity.activity_Type)} is now unpublished and no longer visible to users`
      );

      this.reloadData();
      this.resetState();
    }
  });
}

executeDisplay() {
  const { activity, value } = this.actionState;
  const mappedType = this.mapType(activity.activity_Type);

  this.activityService.displayHomeActivity(activity.activity_ID, mappedType, value!).subscribe({
    next: () => {

      activity.has_Displayed = value;

      this.showSuccess(
        value
          ? `This ${this.getEntityName(activity.activity_Type)} Display on App Home Successfully`
          : `This ${this.getEntityName(activity.activity_Type)} Hide From App Home Successfully`
      );

      this.reloadData();
      this.resetState();
    }
  });
}

openReasonDialog(type: 'cancel' | 'postpone') {
  this.reasonDialog = {
    visible: true,
    title: type === 'cancel'
      ? 'Write Reason for cancellation'
      : 'Reschedule Your Event',
    showDate: type === 'postpone'
  };
}

formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

confirmReason(reason: string, date?: Date) {
  const { type, activity } = this.actionState;

  if (type === 'cancel') {

    this.activityService.cancelEvent(activity.activity_ID, reason).subscribe(() => {

      this.showSuccess(
        `This ${this.getEntityName(activity.activity_Type)} has been cancelled bec ${reason}`
      );

      this.reasonDialog.visible = false;
      this.reloadData();
      this.resetState();
    });

  } else {

     if (!date) {
      console.error('Date is required for postpone');
      this.messageService.add({ severity: 'error', summary:'Failed', detail:'Date is required for postpone' });
      return;
    }

    const formattedDate = this.formatDate(date);

    this.activityService.postponeEvent(activity.activity_ID, reason, formattedDate).subscribe(() => {

      this.showSuccess(
        `This ${this.getEntityName(activity.activity_Type)} has been postponed to ${formattedDate} bec ${reason}`
      );

      this.reasonDialog.visible = false;
      this.reloadData();
      this.resetState();
    });
  }
}

showSuccess(message: string) {
  this.successDialog = {
    visible: true,
    message,
    icon: '/manage-subscription/confirmIcon.svg'
  };

  setTimeout(() => this.successDialog.visible = false, 3000);
}

resetState() {
  this.actionState = {
    type: null,
    activity: null
  };
}

 mapType(type: string): string {
    const map: any = {
      Courses: 'Course',
      Events: 'Event',
      Workshops: 'Workshop',
      Consultant: 'Consult'
    };

    return map[type] || type;
  }

  reloadData() {
    const map: any = {
      0: 'All',
      1: 'Course',
      2: 'Workshop',
      3: 'Event',
      4: 'Consult'
    };

    this.fetchActivities(map[this.activeIndex], 1, 2000);
  }

  getEntityName(type: string): string {
    const map: any = {
      Courses: 'course',
      Events: 'event',
      Workshops: 'workshop',
      Consultant: 'consultation'
    };

    return map[type] || 'item';
  }


  showCanellationReason(message: string) {
    this.successDialog = {
      visible: true,
      message,
      icon: '/activities/reasonIcon.svg'
    };

    setTimeout(() => this.successDialog.visible = false, 3000);
  }

  viewReason(activity: any) {
    if(activity.status === 'Cancelled') 
    {
      this.successDialog = {
        visible: true,
        message: `This ${this.getEntityName(activity.activity_Type)} has been cancelled bec ${activity.reason}`,
        icon: '/activities/reasonIcon.svg'
      };

      setTimeout(() => this.successDialog.visible = false, 5000);
    }
    else if(activity.status === 'Postponed'){
      this.successDialog = {
        visible: true,
        message: `This ${this.getEntityName(activity.activity_Type)} has been postponed bec ${activity.reason}`,
        icon: '/activities/reasonIcon.svg'
      };

      setTimeout(() => this.successDialog.visible = false, 5000);
    }
  }

  // end update

}

