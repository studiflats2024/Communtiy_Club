import {ChangeDetectionStrategy, Component,HostListener } from '@angular/core';
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
import { GatewayService } from '../../services/gateway.service';



@Component({
  selector: 'app-members-details',
  standalone: true,
  imports: [OverlayPanelModule,CalendarModule,ReactiveFormsModule,PaginatorModule,BreadcrumbModule,CommonModule, DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],
  providers: [MessageService ],
  templateUrl: './members-details.component.html',
  styleUrl: './members-details.component.css'
})
export class MembersDetailsComponent {
  items:any[]=[];
 
  globalFilter: string = '';
  
  members: any[] = [];
  status: { label: string; value: string; class: string; selected: boolean;classF:string }[] = [
    { label: 'All', value: 'all', class: 'custom-button-add', selected: false ,classF:'custom-button' },
    { label: 'Success', value: 'success', class: 'p-tag-success', selected: false ,classF:''},
    { label: 'Failed', value: 'failed', class: 'p-tag-danger', selected: false,classF:'' },
    { label: 'Pending', value: 'pending', class: 'p-tag-warning', selected: false,classF:'selected-pending' },
  ];
  

 
  

activities:any[]=[]
invitations:any[]=[]
paymentRecords:any[]=[]
  constructor(private route: ActivatedRoute, private gatewayService:GatewayService,private plansService: PlansService, private messageService: MessageService) {
    this.paymentRecords = [
      {
        name: 'Ahmed Ali',
        email: 'Ahmed.Ali@gmail.com',
        phone_No: '+49 128 45987564',
        date: 'Feb 12, 2025',
        plan_Type: 'Annual',
        amount: 480,
        payment_By: 'Cash',
        paymentByIcon: 'assets/icons/cash.svg',
        payment_Status: 'Success',
      },
      {
        name: 'Ahmed Ali',
        email: 'Ahmed.Ali@gmail.com',
        phone_No: '+49 128 45987564',
        date: 'Feb 12, 2025',
        plan_Type: 'Free Trial Month',
        amount: null,
        payment_By: 'Stripe',
        paymentByIcon: 'assets/icons/stripe.svg',
        payment_Status: 'Failed',
      },
      {
        name: 'Ahmed Ali',
        email: 'Ahmed.Ali@gmail.com',
        phone_No: '+49 128 45987564',
        date: 'Feb 12, 2025',
        plan_Type: 'Monthly',
        amount: 480,
        payment_By: 'MasterCard',
        paymentByIcon: 'assets/icons/cardPay.svg',
        payment_Status: 'Pending',
      },
      {
        name: 'Ahmed Ali',
        email: 'Ahmed.Ali@gmail.com',
        phone_No: '+49 128 45987564',
        date: 'Feb 12, 2025',
        plan_Type: 'Free Trial Month',
        amount: null,
        payment_By: 'Visa',
        paymentByIcon: 'assets/icons/visa.svg',
        payment_Status: 'Success',
      },
    ];

   this. activities = [
      {
        title: 'Orientation Session',
        type: 'Workshop',
        date: new Date(2024, 1, 12),
        status: 'Success'
      },
      {
        title: 'Job Coaching Seminar',
        type: 'Course',
        date: new Date(2024, 1, 15),
        status: 'Pending'
      },
      {
        title: 'Integration Help Workshop',
        type: 'Workshop',
        date: new Date(2024, 1, 18),
        status: 'Success'
      },
      {
        title: 'Career Counseling',
        type: 'Consultation',
        date: new Date(2024, 1, 22),
        status: 'Failed'
      },
      {
        title: 'Networking Event',
        type: 'Event',
        date: new Date(2024, 1, 25),
        status: 'Success'
      },
      {
        title: 'Language Assistance Session',
        type: 'Workshop',
        date: new Date(2024, 1, 28),
        status: 'Pending'
      },
      {
        title: 'Resume Review Workshop',
        type: 'Workshop',
        date: new Date(2024, 2, 2),
        status: 'Success'
      },
      {
        title: 'Internship Guidance Session',
        type: 'Course',
        date: new Date(2024, 2, 5),
        status: 'Failed'
      },
      {
        title: 'Visa Application Support',
        type: 'Consultation',
        date: new Date(2024, 2, 8),
        status: 'Pending'
      },
      {
        title: 'Housing Support Workshop',
        type: 'Workshop',
        date: new Date(2024, 2, 11),
        status: 'Success'
      }
    ];


    this.invitations = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone_No: '+49 176 12345678',
        date: new Date(2024, 1, 12),
        number: 'INV-1001',
        status: 'Success'
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone_No: '+49 176 98765432',
        date: new Date(2024, 1, 15),
        number: 'INV-1002',
        status: 'Pending'
      },
      {
        name: 'Michael Johnson',
        email: 'michael.johnson@example.com',
        phone_No: '+49 176 54321678',
        date: new Date(2024, 1, 18),
        number: 'INV-1003',
        status: 'Failed'
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        phone_No: '+49 176 76543210',
        date: new Date(2024, 1, 22),
        number: 'INV-1004',
        status: 'Success'
      },
      {
        name: 'Chris Brown',
        email: 'chris.brown@example.com',
        phone_No: '+49 176 32165498',
        date: new Date(2024, 1, 25),
        number: 'INV-1005',
        status: 'Success'
      },
      {
        name: 'Olivia Wilson',
        email: 'olivia.wilson@example.com',
        phone_No: '+49 176 15975346',
        date: new Date(2024, 1, 28),
        number: 'INV-1006',
        status: 'Pending'
      },
      {
        name: 'Liam Martinez',
        email: 'liam.martinez@example.com',
        phone_No: '+49 176 14785236',
        date: new Date(2024, 2, 2),
        number: 'INV-1007',
        status: 'Success'
      },
      {
        name: 'Sophia Taylor',
        email: 'sophia.taylor@example.com',
        phone_No: '+49 176 36925814',
        date: new Date(2024, 2, 5),
        number: 'INV-1008',
        status: 'Failed'
      },
      {
        name: 'Ethan White',
        email: 'ethan.white@example.com',
        phone_No: '+49 176 78965412',
        date: new Date(2024, 2, 8),
        number: 'INV-1009',
        status: 'Pending'
      },
      {
        name: 'Ava Harris',
        email: 'ava.harris@example.com',
        phone_No: '+49 176 25896314',
        date: new Date(2024, 2, 11),
        number: 'INV-1010',
        status: 'Success'
      }
    ];
    
    
  }

  subscription_ID:any;
  ngOnInit() {

    // this.adjustDialogStyle(window.innerWidth);
    this.subscription_ID = this.route.snapshot.paramMap.get('id');
    if( this.subscription_ID){
       this.fetchMemberDetails(this.subscription_ID)
    }

    this.items = [
      { label: 'Community Club', routerLink: '/dashboard' },

      { label: 'Members', routerLink: '/members' },

      { label: 'Member Details', routerLink: '/member-details' },

      
    ];

     

    
  }

  memberDetails:any
  
  fetchMemberDetails(subscriptionId: string): void {
    this.gatewayService.getMemberDetails(subscriptionId).subscribe({
      next: (response) => {
        this.memberDetails = response;
        this.activities=this.memberDetails?._Activities
        this.invitations=this.memberDetails?._Invitations
        this.paymentRecords=this.memberDetails?._Invoices
        console.log('Member Details:', this.memberDetails);
      },
      error: (error) => {
        console.error('Error fetching member details:', error);
      },
    });
  }
  
  
  getActivityClass(activityType: string): string {
    switch (activityType) {
      case 'Course':
        return 'p-tag-info'; // Green for success
      case 'Workshop':
        return 'p-tag-purble'; // Purple for workshops
      case 'Event':
        return 'p-tag-success'; // Blue for events
      case 'Consultation':
        return 'p-tag-danger'; // Red for consultant
      default:
        return ''; // Default class (if any)
    }
  }
  

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
  

getPlanImage(planName: string | undefined): string | null {
  if (!planName) return null; // Ensure planName exists

  const lowerPlanName = planName.toLowerCase(); // Convert to lowercase for case insensitivity

  // Check for keywords inside planName
  if (lowerPlanName.includes('annual')) return 'community/starplan.svg';
  if (lowerPlanName.includes('monthly')) return 'month.svg';
  if (lowerPlanName.includes('free')) return 'freePlan.svg';
  if (lowerPlanName.includes('semi-annual') || lowerPlanName.includes('6 months')) return 'months.svg';
  if (lowerPlanName.includes('quarterly') || lowerPlanName.includes('3 months')) return 'months.svg';

  return null; // Default: No image if no match
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
  this.planTypes.forEach((t) => (t.selected = false));  
  type.selected = true;  
  this.payType=type.label;

  // إذا كنت تريد السماح باختيار أزرار متعددة، قم بإزالة التعليق:
  // type.selected = !type.selected;
   
  //  if (type.label === 'All') {
  //   this.planTypes.forEach((t) => {
  //     if (t.label !== 'All') {
  //       t.selected = false;
  //     }
  //   });
  // } 
  // else {
 
  //   const allStatus = this.planTypes.find((t) => t.label === 'All');
  //   if (allStatus) {
  //     allStatus.selected = false;
  //   }
  // }
}

toggleStatus(type: any): void {

  this.status.forEach((t) => (t.selected = false));  
  type.selected = true;  
  this.payStatus=type.label;
  
  // type.selected = !type.selected;
 
  // if (type.value === 'all') {
  //   this.status.forEach((t) => {
  //     if (t.value !== 'all') {
  //       t.selected = false;
  //     }
  //   });
  // } else {
   
  //   const allStatus = this.status.find((t) => t.value === 'all');
  //   if (allStatus) {
  //     allStatus.selected = false;
  //   }
  // }
}


openFilterDialog(): void {
  this.displayFilter = true;
}
openFilterAlertDialog(){
  this.displayFilterAlert=true
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
payFilter:boolean=false;
  showReminder() {
    this.displayFilter=false
    this.displayFilterAlert=false
    this.displayReminder = true;
  }

  filterPay(){
    this.fetchRecords()
    this.payFilter=true;
  }
  filterAlert(){
    this.fetchSubscriptionAlerts()
    this.payFilter=true;
  }

///////////////////////////payment dropdown/////////////////////////
 // List of payment methods
 paymentMethods = [
  { name: 'VISA', value: 'visa', image: 'visaDrop.svg' },
  { name: 'Stripe', value: 'stripe', image: 'stripePay.svg' },
  { name: 'MasterCard', value: 'mastercard', image: 'cardPay.svg' },
  { name: 'PayPal', value: 'paypal', image: 'paypal.svg' },
  { name: 'Cash', value: 'cash', image: 'cashPay.svg' },
  { name: 'Online', value: 'online', image: 'community/payOnline.png' }

];

// Selected payment method
selectedPayment: any = null;

//////////////////////////////integration of payment section /////////////////////////////////////////////////////////
payType:any='All';
payStatus:any=null
paymentBy:any=null
payfrom:any=null
payTo:any=null
paySearchword:any=null
fetchRecords(): void {
  const pageNumber = 1;  
  const pageSize = 2000;  
  const type = this.payType;
  const status = this.payStatus; 
  const paymentBy = this.selectedPayment?.name; 
   
  const searchWord = this.paySearchword; 
  
  if(this.payfrom){
    this.payfrom = new Date(this.payfrom).toISOString();
  console.log("Formatted From:",this.payfrom);
    
    }
    if(this.payTo){
      this.payTo = new Date(this.payTo).toISOString();
  
      console.log("Formatted To:", this.payTo);
  
      
      }

      const from = this.payfrom; 
      const to = this.payTo; 

  this.gatewayService
    .getPaymentRecords(pageNumber, pageSize, type, status, paymentBy, from, to, searchWord)
    .subscribe(
      (data) => {
        console.log(data)
       //  this.paymentRecords = data.data;  
       //  console.log('Payment Records:', this.paymentRecords);  
        if(this.payFilter){
          this.showReminder()
        }
      },
      (error) => {
        console.error('Error fetching payment records:', error); // Handle errors
      }
    );
}



markInvoiceAsPaid(invId: string): void {
  this.gatewayService.setInvoicePaid(invId).subscribe(
    (response) => {
      console.log('Invoice marked as paid:', response);
      this.messageService.add({ severity: 'success', summary:'Success', detail:response.message });
      this.fetchRecords()
    },
    (error) => {
      console.error('Error marking invoice as paid:', error);
      this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });

    }
  );
}

markInvoiceAsUnPaid(invId: string): void {
  this.gatewayService.setInvoiceUnPaid(invId).subscribe(
    (response) => {
      console.log('Invoice marked as unpaid:', response);
      this.messageService.add({ severity: 'success', summary:'Success', detail:response.message });
      this.fetchRecords()
      
    },
    (error) => {
      console.error('Error marking invoice as unpaid:', error);
      this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });

    }
  );
}


//////////////////////////////get subscription alert/////////////////////////////
subscriptionAlerts:any 
alertType:any=null;
alertfrom:any=null;
alertTo:any=null;
fetchSubscriptionAlerts(): void {
  const pageNumber = 1;  
  const pageSize = 2000;  
  const type = this.payType;
   
  const searchWord = this.paySearchword;
  if(this.alertfrom){
    this.alertfrom = new Date(this.alertfrom).toISOString();
      console.log("Formatted From:", this.alertfrom);
  }
  if(this.alertTo){
    this.alertTo = new Date(this.alertTo).toISOString();
      console.log("Formatted To:", this.alertTo);
    }

    const from = this.alertfrom; 
    const to = this.alertTo; 
  

  this.gatewayService
    .getSubscriptionAlerts(pageNumber, pageSize, type, from, to, searchWord)
    .subscribe(
      (response) => {
        this.subscriptionAlerts = response.data || [];
        console.log(response)
        console.log('Subscription Alerts:', response);
        if(this.payFilter){
          this.showReminder()
        }
      },
      (error) => {
      
        console.error('Error fetching subscription alerts:', error);
      }
    );
}
displayFilterAlert:boolean=false;


 
sendAlert(subscribeId: string) {
  this.gatewayService.sendSubscriptionAlert(subscribeId).subscribe(
    response => {
      console.log('Alert sent successfully', response);
      this.messageService.add({ severity: 'success', summary:'Success', detail:response.message });

    },
    error => {
      console.error('Error sending alert', error);
      this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });

    }
  );
}








customSort(event: { data: any[], field: string, order: number }) {
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
 
}
