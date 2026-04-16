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
import { MessageService,ConfirmationService, } from 'primeng/api';
 
 
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
// PrimeNG Modules
import { TooltipModule } from 'primeng/tooltip';



@Component({
  selector: 'app-cancellation',
  standalone: true,
  imports: [ TooltipModule,OverlayPanelModule,CalendarModule,ReactiveFormsModule,PaginatorModule,BreadcrumbModule,CommonModule, DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],
  providers: [MessageService,ConfirmationService ],
  templateUrl: './cancellation.component.html',
  styleUrl: './cancellation.component.css'
})
export class CancellationComponent {
  items:any[]=[];

  globalFilter: string = '';
  subscriptions: any[] = [];
  paymentRecords: any[] = [];
  status: { label: string; value: string; class: string; selected: boolean;classF:string }[] = [
    { label: 'All', value: 'all', class: 'custom-button-add', selected: false ,classF:'custom-button' },
    { label: 'Success', value: 'success', class: 'p-tag-success', selected: false ,classF:''},
    { label: 'Failed', value: 'failed', class: 'p-tag-danger', selected: false,classF:'' },
    { label: 'Pending', value: 'pending', class: 'p-tag-warning', selected: false,classF:'selected-pending' },
  ];
  

 
  


  constructor( private confirmationService: ConfirmationService, private gatewayService:GatewayService,private plansService: PlansService, private messageService: MessageService) {
    
    
  }


  ngOnInit() {

    // this.adjustDialogStyle(window.innerWidth);


    this.items = [
      { label: 'Dashboard', routerLink: '/dashboard' },

      { label: 'Cancellation Requests', routerLink: '/cancellation-request' },
      
    ];

  this.loadCancelRequests();
// this.cancelRequests= [
//   {
//     "member_ID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "name": "John Doe",
//     "email": "john.doe@example.com",
//     "phone": "123-456-7890",
//     "plan_Type": "Premium",
//     "date": "2025-03-22T10:30:00Z",
//     "reason": "No longer needed ,Found a better plan Found a better plan Found a better plan Found a better plan Found a better plan"
//   },
//   {
//     "member_ID": "9c17a8d2-9d37-4c3a-821d-bf63c34e7c12",
//     "name": "Alice Smith",
//     "email": "alice.smith@example.com",
//     "phone": "987-654-3210",
//     "plan_Type": "Standard",
//     "date": "2025-03-21T15:45:00Z",
//     "reason": "Found a better plan"
//   },
//   {
//     "member_ID": "5d68c7f4-a2e3-4c11-bbbc-9a12b0eaf576",
//     "name": "Bob Johnson",
//     "email": "bob.johnson@example.com",
//     "phone": "555-123-4567",
//     "plan_Type": "Basic",
//     "date": "2025-03-20T08:20:00Z",
//     "reason": "Moving to another city"
//   },
//   {
//     "member_ID": "b4c7f0e5-482e-4b19-8c12-6d8c22aef111",
//     "name": "Emma Wilson",
//     "email": "emma.wilson@example.com",
//     "phone": "444-321-6789",
//     "plan_Type": "Basic",
//     "date": "2025-03-19T12:10:00Z",
//     "reason": "Too expensive"
//   },
//   {
//     "member_ID": "d68c8e29-3c7e-4abf-9432-6d1f61c3ef12",
//     "name": "Michael Brown",
//     "email": "michael.brown@example.com",
//     "phone": "777-888-9999",
//     "plan_Type": "Premium",
//     "date": "2025-03-18T17:55:00Z",
//     "reason": "Service not satisfactory"
//   },
//   {
//     "member_ID": "bf85f674-4517-4632-b3fc-2c963f66afa7",
//     "name": "Sophia Taylor",
//     "email": "sophia.taylor@example.com",
//     "phone": "333-444-5555",
//     "plan_Type": "Standard",
//     "date": "2025-03-17T11:00:00Z",
//     "reason": "Technical issues"
//   },
//   {
//     "member_ID": "ce7b4d8a-5912-4eb7-9564-a1c5e3d7e9a3",
//     "name": "David Lee",
//     "email": "david.lee@example.com",
//     "phone": "222-333-4444",
//     "plan_Type": "Premium",
//     "date": "2025-03-16T09:15:00Z",
//     "reason": "Switching providers"
//   },
//   {
//     "member_ID": "ad19f7c8-47c2-42db-8a7f-3d41e09e8c34",
//     "name": "Olivia Harris",
//     "email": "olivia.harris@example.com",
//     "phone": "111-222-3333",
//     "plan_Type": "Basic",
//     "date": "2025-03-15T18:30:00Z",
//     "reason": "Lack of features"
//   },
//   {
//     "member_ID": "fb15c8a1-32bf-4b29-80f7-2f96e3a4c9d5",
//     "name": "Liam Clark",
//     "email": "liam.clark@example.com",
//     "phone": "666-777-8888",
//     "plan_Type": "Premium",
//     "date": "2025-03-14T16:05:00Z",
//     "reason": "Billing issues"
//   },
//   {
//     "member_ID": "a5d7f9c8-1f34-4db7-8a6d-3f51b08e9d56",
//     "name": "Charlotte Lewis",
//     "email": "charlotte.lewis@example.com",
//     "phone": "999-111-2222",
//     "plan_Type": "Standard",
//     "date": "2025-03-13T14:40:00Z",
//     "reason": "No longer affordable"
//   }
// ]
    
  }
 
  showReason(event: Event, reason: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: reason,
      icon: 'pi pi-info-circle',
      acceptLabel: 'OK',
      rejectLabel: 'Close',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Accepted', detail: 'You have acknowledged the reason.' });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Closed', detail: 'You closed the reason popup.' });
      }
    });
  }

  cancelRequests:any[]=[];
  totalRecords:any
  loadCancelRequests() {
    
    this.gatewayService.getCancelPlans( 1, 30000).subscribe(
      response => {
        console.log('Cancel Requests:', response);
        this.cancelRequests = response.data ;
        this.totalRecords = response.totalRecords || response.length;
       
      },
      error => {
        console.error('Error fetching cancel requests:', error);
       
      }
    );
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
  
  currentPage:any;
  pageChange(event: any): void {
    this.currentPage = event.page;
    console.log(`Current Page: ${this.currentPage}`);
  }

  ////////////////////////plan list//////////////////////////
  plans: any[] = []; // To store fetched plans
  errorMessage: string = '';
  loadPlans(): void {
    this.plansService.getPlans().subscribe({
      next: (data) => {
        this.plans = data;
        
        console.log('Plans fetched:', this.plans);
      },
      error: (error) => {
        this.errorMessage = error;
        console.error('Error fetching plans:', this.errorMessage);
      }
    });
  }

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

 
 



 

 
 
displayFilterAlert:boolean=false;


 


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
