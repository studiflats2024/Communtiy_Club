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
import { GatewayService } from '../../services/gateway.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule,CheckboxModule,OverlayPanelModule, CalendarModule,ReactiveFormsModule,PaginatorModule,BreadcrumbModule,CommonModule, DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],

  providers: [MessageService ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  items:any[]=[];
 
  globalFilter: string = '';
  
  users: any[] = [];
  status: { label: string; value: string; class: string; selected: boolean;classF:string }[] = [
    { label: 'All', value: 'all', class: 'custom-button-add', selected: false ,classF:'custom-button' },
    { label: 'Success', value: 'success', class: 'p-tag-success', selected: false ,classF:''},
    { label: 'Failed', value: 'failed', class: 'p-tag-danger', selected: false,classF:'' },
    { label: 'Pending', value: 'pending', class: 'p-tag-warning', selected: false,classF:'selected-pending' },
  ];
  

  

  


  constructor( private gatewayService:GatewayService,private plansService: PlansService, private messageService: MessageService) {
  

    this.users = [
      {
        user_ID: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone_No: '+1 123 456 7890',
        active_date: '2023-12-01',
        role: 'Admin',
        status: 'Activate',
      },
      {
        user_ID: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone_No: '+1 987 654 3210',
        active_date: '2023-11-20',
        role: 'User',
        status: 'Deactivate',
      },
      {
        user_ID: 3,
        name: 'Robert Brown',
        email: 'robert.brown@example.com',
        phone_No: '+44 789 456 1234',
        active_date: '2023-10-15',
        role: 'Moderator',
        status: 'Activate',
      },
      {
        user_ID: 4,
        name: 'Emily White',
        email: 'emily.white@example.com',
        phone_No: '+33 123 789 4561',
        active_date: '2023-12-05',
        role: 'Admin',
        status: 'Deactivate',
      },
      {
        user_ID: 5,
        name: 'Chris Johnson',
        email: 'chris.johnson@example.com',
        phone_No: '+61 321 654 9870',
        active_date: '2023-09-25',
        role: 'User',
        status: 'Activate',
      },
      {
        user_ID: 6,
        name: 'Patricia Taylor',
        email: 'patricia.taylor@example.com',
        phone_No: '+49 567 890 1234',
        active_date: '2023-12-10',
        role: 'Moderator',
        status: 'Deactivate',
      },
      {
        user_ID: 7,
        name: 'Michael Green',
        email: 'michael.green@example.com',
        phone_No: '+91 654 123 9870',
        active_date: '2023-11-30',
        role: 'User',
        status: 'Activate',
      },
      {
        user_ID: 8,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        phone_No: '+81 123 456 7891',
        active_date: '2023-10-10',
        role: 'Admin',
        status: 'Deactivate',
      },
      {
        user_ID: 9,
        name: 'David Martinez',
        email: 'david.martinez@example.com',
        phone_No: '+34 987 654 3210',
        active_date: '2023-11-01',
        role: 'User',
        status: 'Activate',
      },
      {
        user_ID: 10,
        name: 'Sophia Anderson',
        email: 'sophia.anderson@example.com',
        phone_No: '+86 123 789 4561',
        active_date: '2023-12-15',
        role: 'Moderator',
        status: 'Activate',
      },
    ];
    
  }


  ngOnInit() {

    // this.adjustDialogStyle(window.innerWidth);


    this.items = [
      { label: 'Community Club', routerLink: '/dashboard' },

      { label: 'Manage Users', routerLink: '/users' },
      
    ];

     this.fetchAdmins(1,2000)

    
  }
  
  
  fetchAdmins(page: number, size: number) {
    this.gatewayService.getAllAdmins(page, size).subscribe({
      next: (response) => {
        this.users = response.data; // Adjust based on API response
        console.log(this.users)
      },
      error: (error) => {
        console.error('Error fetching admins:', error);
      }
    });
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
        return 'badge-free-trial'; 
        case 'Test 101':
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
        return 'pi pi-gift';
        case 'Test 101':
          return 'pi pi-gift';  
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

 

 


openFilterDialog(): void {
  this.displayFilter = true;
}
openFilterAlertDialog(){
  // this.displayFilterAlert=true
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
    // this.displayFilterAlert=false
    this.displayReminder = true;
  }

  filterPay(){
     
    this.payFilter=true;
  }
  filterAlert(){
   
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

 



customSort(event: { data: any[], field: string, order: number }) {
  event.data.sort((a, b) => {
    let valueA = a[event.field];
    let valueB = b[event.field];

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

// ✅ دالة تتحقق مما إذا كانت القيمة تاريخًا
isDate(value: any): boolean {
  return !isNaN(Date.parse(value));
}
}
