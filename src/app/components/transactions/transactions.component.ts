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
  selector: 'app-transactions',
  standalone: true,
  imports: [RouterModule,CheckboxModule,OverlayPanelModule, CalendarModule,ReactiveFormsModule,PaginatorModule,BreadcrumbModule,CommonModule, DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],
  providers: [MessageService ],

  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {

  items:any[]=[];
  payTo:any
  payfrom:any

  
    
    status: { label: string; value: string; class: string; selected: boolean;classF:string }[] = [
      { label: 'All', value: 'all', class: 'custom-button-add', selected: false ,classF:'custom-button' },
      { label: 'Success', value: 'success', class: 'p-tag-success', selected: false ,classF:''},
      { label: 'Failed', value: 'failed', class: 'p-tag-danger', selected: false,classF:'' },
      { label: 'Pending', value: 'pending', class: 'p-tag-warning', selected: false,classF:'selected-pending' },
    ];
    
  
   
    
    globalFilter: string = '';
    paymentRecords:any[]=[]
    transactions: any[]
    constructor( private gatewayService:GatewayService,private plansService: PlansService, private messageService: MessageService) {
    this.transactions = [
  {
    name: 'Ahmed Ali',
    email: 'Ahmed.Ali@gmail.com',
    phone: '+49 128 45987564',
    plan_Type: 'Monthly',
    scan_Time: '10:00 AM',
    scan_Date: new Date('2025-03-12'),
    status: 'Success',
    payment_By: 'Cash',
    amount: 50,
  },
  {
    name: 'Ahmed Ali',
    email: 'Ahmed.Ali@gmail.com',
    phone: '+49 128 45987564',
    plan_Type: 'Free Trial Month',
    scan_Time: '09:30 AM',
    scan_Date: new Date('2025-03-12'),
    status: 'Failed',
    payment_By: 'Stripe',
    amount: 0,
  },
  {
    name: 'Ahmed Ali',
    email: 'Ahmed.Ali@gmail.com',
    phone: '+49 128 45987564',
    plan_Type: 'Invitation',
    scan_Time: '11:25 AM',
    scan_Date: new Date('2025-03-12'),
    status: 'Success',
    payment_By: 'MasterCard',
    amount: 70,
  },
  {
    name: 'Ahmed Ali',
    email: 'Ahmed.Ali@gmail.com',
    phone: '+49 128 45987564',
    plan_Type: 'Semi-Annual',
    scan_Time: '02:30 PM',
    scan_Date: new Date('2025-03-12'),
    status: 'Failed',
    payment_By: 'Visa',
    amount: 120,
  },
  {
    name: 'Ahmed Ali',
    email: 'Ahmed.Ali@gmail.com',
    phone: '+49 128 45987564',
    plan_Type: 'Annual',
    scan_Time: '03:00 PM',
    scan_Date: new Date('2025-03-12'),
    status: 'Success',
    payment_By: 'PayPal',
    amount: 200,
  },
];

    }
  
  
    ngOnInit() {
  
      // this.adjustDialogStyle(window.innerWidth);
  
  
      this.items = [
        { label: 'Community Club', routerLink: '/dashboard' },
  
        { label: 'Transactions', routerLink: '/transactions' },
        
      ];
  
      
  this.loadTransactions(1,2000)
      
    }
   
    
    loadTransactions(pageNo: number, pageSize: number): void {
      this.gatewayService.getAllTransactions(pageNo, pageSize).subscribe(
        (response) => {
          this.transactions = response.data;
          console.log('Transactions:', response);
        },
        (error) => {
          console.error('Error fetching transactions:', error);
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
    // this.payType=type.label;
  
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
    // this.payStatus=type.label;
    
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
  
  
 
   
  /////////////filter success////////////////////////////////////
  displayReminder: boolean = false;
  payFilter:boolean=false;
    showReminder() {
      this.displayFilter=false
      
      this.displayReminder = true;
    }
  
    filterPay(){
      
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
  