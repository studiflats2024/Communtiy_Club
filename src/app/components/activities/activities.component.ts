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

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CalendarModule,ReactiveFormsModule,PaginatorModule,BreadcrumbModule,CommonModule, DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],

  providers: [MessageService],

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
    { title: 'Learn German: Beginner Level', type: 'Course', typeClass: 'p-tag-info', startDate: new Date(2025, 1, 12), endDate: new Date(2025, 1, 20), seatsAvailable: '5 Seat leave', bookings: '30/35' },
    { title: 'Learn German: Beginner Level', type: 'Workshop', typeClass: 'p-tag-purble', startDate: new Date(2025, 1, 12), endDate: new Date(2025, 1, 20), seatsAvailable: '5 Seat leave', bookings: '30/35' },
    { title: 'Learn German: Beginner Level', type: 'Event', typeClass: 'p-tag-success', startDate: new Date(2025, 1, 12), endDate: new Date(2025, 1, 20), seatsAvailable: '5 Seat leave', bookings: '30/35' },
    { title: 'Learn German: Beginner Level', type: 'Consultant', typeClass: 'p-tag-danger', startDate: new Date(2025, 1, 12), endDate: new Date(2025, 1, 20), seatsAvailable: '5 Seat leave', bookings: '30/35' },
  ];

 
  


  constructor(private plansService: PlansService) {
   

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

    this.loadPlans();

    
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
}
