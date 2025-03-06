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
  selector: 'app-members',
  standalone: true,
  imports: [RouterModule,CheckboxModule,OverlayPanelModule, CalendarModule,ReactiveFormsModule,PaginatorModule,BreadcrumbModule,CommonModule, DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],

  providers: [MessageService ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent {
   items:any[]=[];
 
   globalFilter: string = '';
   
   members: any[] = [];
   status: { label: string; value: string; class: string; selected: boolean;classF:string }[] = [
     { label: 'All', value: 'all', class: 'custom-button-add', selected: false ,classF:'custom-button' },
     { label: 'Success', value: 'success', class: 'p-tag-success', selected: false ,classF:''},
     { label: 'Failed', value: 'failed', class: 'p-tag-danger', selected: false,classF:'' },
     { label: 'Pending', value: 'pending', class: 'p-tag-warning', selected: false,classF:'selected-pending' },
   ];
   
 
  
   
 
 
   constructor( private gatewayService:GatewayService,private plansService: PlansService, private messageService: MessageService) {
   
 
     this.members = [
       {
         name: 'Ahmed Ali',
         email: 'Ahmed.Ali@gmail.com',
         phone_No: '+49 128 45987564',
         date: 'Feb 12, 2025',
         plan_Type: 'Annual',
         amount: 480,
         paymentBy: 'Cash',
         paymentByIcon: 'assets/icons/cash.svg',
         status: 'Success',
       },
       {
         name: 'Ahmed Ali',
         email: 'Ahmed.Ali@gmail.com',
         phone_No: '+49 128 45987564',
         date: 'Feb 12, 2025',
         plan_Type: 'Free Trial Month',
         amount: null,
         paymentBy: 'Stripe',
         paymentByIcon: 'assets/icons/stripe.svg',
         status: 'Failed',
       },
       {
         name: 'Ahmed Ali',
         email: 'Ahmed.Ali@gmail.com',
         phone_No: '+49 128 45987564',
         date: 'Feb 12, 2025',
         plan_Type: 'Monthly',
         amount: 480,
         paymentBy: 'MasterCard',
         paymentByIcon: 'assets/icons/mastercard.svg',
         status: 'Pending',
       },
       {
         name: 'Ahmed Ali',
         email: 'Ahmed.Ali@gmail.com',
         phone_No: '+49 128 45987564',
         date: 'Feb 12, 2025',
         plan_Type: 'Free Trial Month',
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
 
       { label: 'Members', routerLink: '/members' },
       
     ];
 
      
 this.loadMembers(1,2000)
     
   }


   loadMembers(page: number, size: number): void {
    this.gatewayService.getAllMembers(page, size).subscribe({
      next: (response) => {
        this.members = response.data; // Assuming response contains a `data` array
 
        console.log('Members:', this.members);
      },
      error: (error) => {
        console.error('Error fetching members:', error);
      },
    });
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
     
     this.payFilter=true;
   }
   filterAlert(){
     
     this.payFilter=true;
   }
 
 ///////////////////////////payment dropdown/////////////////////////
   
  paymentMethods = [
   { name: 'VISA', value: 'visa', image: 'visaDrop.svg' },
   { name: 'Stripe', value: 'stripe', image: 'stripePay.svg' },
   { name: 'MasterCard', value: 'mastercard', image: 'cardPay.svg' },
   { name: 'PayPal', value: 'paypal', image: 'paypal.svg' },
   { name: 'Cash', value: 'cash', image: 'cashPay.svg' },
   { name: 'Online', value: 'online', image: 'community/payOnline.png' }
 
 ];
 
 
 selectedPayment: any = null;
 
 
 payType:any='All';
 payStatus:any=null
 paymentBy:any=null
 payfrom:any=null
 payTo:any=null
 paySearchword:any=null
  
 
 
 
 
 
 
 
 subscriptionAlerts:any 
 alertType:any=null;
 alertfrom:any=null;
 alertTo:any=null;
 
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
