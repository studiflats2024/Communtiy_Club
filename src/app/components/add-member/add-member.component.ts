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
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [ RadioButtonModule,RouterModule,CheckboxModule,OverlayPanelModule, CalendarModule,ReactiveFormsModule,PaginatorModule,BreadcrumbModule,CommonModule, DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],

  providers: [MessageService ],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css'
})
export class AddMemberComponent {
  items:any[]=[];
 
  globalFilter: string = '';
  
  tenants: any[] = [];
  status: { label: string; value: string; class: string; selected: boolean;classF:string }[] = [
    { label: 'All', value: 'all', class: 'custom-button-add', selected: false ,classF:'custom-button' },
    { label: 'Success', value: 'success', class: 'p-tag-success', selected: false ,classF:''},
    { label: 'Failed', value: 'failed', class: 'p-tag-danger', selected: false,classF:'' },
    { label: 'Pending', value: 'pending', class: 'p-tag-warning', selected: false,classF:'selected-pending' },
  ];
  

 paid:any;
  


  constructor( private gatewayService:GatewayService,private plansService: PlansService, private messageService: MessageService) {
  

    this.tenants = [
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        phone_No: '+49 176 12345678',
        apart_No: 'A-101',
        contract_SD: new Date(2024, 0, 15), // January 15, 2024
        contract_ED: new Date(2025, 0, 15)  // January 15, 2025
      },
      {
        name: 'Bob Williams',
        email: 'bob.williams@example.com',
        phone_No: '+49 176 23456789',
        apart_No: 'B-202',
        contract_SD: new Date(2023, 5, 1),  // June 1, 2023
        contract_ED: new Date(2024, 5, 1)   // June 1, 2024
      },
      {
        name: 'Clara Smith',
        email: 'clara.smith@example.com',
        phone_No: '+49 176 34567890',
        apart_No: 'C-303',
        contract_SD: new Date(2023, 8, 10),  // September 10, 2023
        contract_ED: new Date(2024, 8, 10)   // September 10, 2024
      },
      {
        name: 'David Brown',
        email: 'david.brown@example.com',
        phone_No: '+49 176 45678901',
        apart_No: 'D-404',
        contract_SD: new Date(2024, 2, 20),  // March 20, 2024
        contract_ED: new Date(2025, 2, 20)   // March 20, 2025
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        phone_No: '+49 176 56789012',
        apart_No: 'E-505',
        contract_SD: new Date(2023, 10, 5),  // November 5, 2023
        contract_ED: new Date(2024, 10, 5)   // November 5, 2024
      },
      {
        name: 'Frank Harris',
        email: 'frank.harris@example.com',
        phone_No: '+49 176 67890123',
        apart_No: 'F-606',
        contract_SD: new Date(2022, 4, 25),  // May 25, 2022
        contract_ED: new Date(2024, 4, 25)   // May 25, 2024
      },
      {
        name: 'Grace Wilson',
        email: 'grace.wilson@example.com',
        phone_No: '+49 176 78901234',
        apart_No: 'G-707',
        contract_SD: new Date(2024, 6, 1),   // July 1, 2024
        contract_ED: new Date(2025, 6, 1)    // July 1, 2025
      },
      {
        name: 'Henry Martinez',
        email: 'henry.martinez@example.com',
        phone_No: '+49 176 89012345',
        apart_No: 'H-808',
        contract_SD: new Date(2023, 3, 18),  // April 18, 2023
        contract_ED: new Date(2024, 3, 18)   // April 18, 2024
      },
      {
        name: 'Ivy Clark',
        email: 'ivy.clark@example.com',
        phone_No: '+49 176 90123456',
        apart_No: 'I-909',
        contract_SD: new Date(2024, 9, 30),  // October 30, 2024
        contract_ED: new Date(2025, 9, 30)   // October 30, 2025
      },
      {
        name: 'Jack Lewis',
        email: 'jack.lewis@example.com',
        phone_No: '+49 176 01234567',
        apart_No: 'J-1010',
        contract_SD: new Date(2023, 11, 10), // December 10, 2023
        contract_ED: new Date(2024, 11, 10)  // December 10, 2024
      }
    ];
    
  }


  ngOnInit() {

    // this.adjustDialogStyle(window.innerWidth);


    this.items = [
      { label: 'Community Club', routerLink: '/dashboard' },

      { label: 'Members', routerLink: '/members' },
      { label: 'Add Member', routerLink: '/add-member' },

      
    ];

     

    
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

//////////////////////////////////////dialog ////////////////////////////////////
selectedPlan: any;
  
pricingPlans = [
  {
    name: 'Free Trial Month',
    price: 0,
    duration: 'Free',
    icon: 'pi pi-calendar',
    selected: false
  },
  {
    name: 'Monthly',
    price: 50,
    duration: 'month',
    icon: 'pi pi-user',
    selected: false
  },
  {
    name: 'Semi-Annual',
    price: 270,
    duration: '6-month',
    icon: 'pi pi-calendar-times',
    selected: false
  },
  {
    name: 'Annual',
    price: 480,
    duration: 'Year',
    icon: 'pi pi-star',
    selected: false
  }
];

selectPlan(plan: any) {
  this.pricingPlans.forEach((p) => (p.selected = false));
  plan.selected = true;
  this.selectedPlan = plan;
}
}
