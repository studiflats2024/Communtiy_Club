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
  selector: 'app-participants',
  standalone: true,
  imports: [OverlayPanelModule,CalendarModule,ReactiveFormsModule,PaginatorModule,BreadcrumbModule,CommonModule, DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],
  providers: [MessageService ],
  templateUrl: './participants.component.html',
  styleUrl: './participants.component.css'
})
export class ParticipantsComponent {
  items:any[]=[];
  modelValue:any

  globalFilter: string = '';
  
  status: { label: string; value: string; class: string; selected: boolean;classF:string }[] = [
    { label: 'All', value: 'all', class: 'custom-button-add', selected: false ,classF:'custom-button' },
    { label: 'Success', value: 'success', class: 'p-tag-success', selected: false ,classF:''},
    { label: 'Failed', value: 'failed', class: 'p-tag-danger', selected: false,classF:'' },
    { label: 'Pending', value: 'pending', class: 'p-tag-warning', selected: false,classF:'selected-pending' },
  ];
  

 
  

  participants:any[]=[]
  constructor( private route: ActivatedRoute,private gatewayService:GatewayService,private plansService: PlansService, private messageService: MessageService) {
   

    this.participants = [
      {
        id:'81e29249-6f1d-40c6-b749-b4f2d7f99afe',
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        phone: '+49 176 12345678',
        booking_Date: new Date(2024, 1, 12), // Feb 12, 2024
        status: 'Success'
      },
      {
        name: 'Bob Williams',
        email: 'bob.williams@example.com',
        phone: '+49 176 23456789',
        booking_Date: new Date(2024, 1, 15), // Feb 15, 2024
        status: 'Pending'
      },
      {
        name: 'Clara Smith',
        email: 'clara.smith@example.com',
        phone: '+49 176 34567890',
        booking_Date: new Date(2024, 1, 18), // Feb 18, 2024
        status: 'Failed'
      },
      {
        name: 'David Brown',
        email: 'david.brown@example.com',
        phone: '+49 176 45678901',
        booking_Date: new Date(2024, 1, 22), // Feb 22, 2024
        status: 'Success'
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        phone: '+49 176 56789012',
        booking_Date: new Date(2024, 1, 25), // Feb 25, 2024
        status: 'Pending'
      },
      {
        name: 'Frank Harris',
        email: 'frank.harris@example.com',
        phone: '+49 176 67890123',
        booking_Date: new Date(2024, 1, 28), // Feb 28, 2024
        status: 'Failed'
      },
      {
        name: 'Grace Wilson',
        email: 'grace.wilson@example.com',
        phone: '+49 176 78901234',
        booking_Date: new Date(2024, 2, 2), // March 2, 2024
        status: 'Success'
      },
      {
        name: 'Henry Martinez',
        email: 'henry.martinez@example.com',
        phone: '+49 176 89012345',
        booking_Date: new Date(2024, 2, 5), // March 5, 2024
        status: 'Pending'
      },
      {
        name: 'Ivy Clark',
        email: 'ivy.clark@example.com',
        phone: '+49 176 90123456',
        booking_Date: new Date(2024, 2, 8), // March 8, 2024
        status: 'Failed'
      },
      {
        name: 'Jack Lewis',
        email: 'jack.lewis@example.com',
        phone: '+49 176 01234567',
        booking_Date: new Date(2024, 2, 11), // March 11, 2024
        status: 'Success'
      }
    ];
    
  }

  activityId:any
  activityType:any
  ngOnInit() {

    // this.adjustDialogStyle(window.innerWidth);

    this.activityId = this.route.snapshot.paramMap.get('id');
    this.activityType = this.route.snapshot.paramMap.get('type');
    if (this.activityId&&this.activityType) {
       this.loadParticipants(1,2000,this.activityType,this.activityId)
    }
    this.items = [
      { label: 'Community Club', routerLink: '/dashboard' },
      { label: 'Activities', routerLink: '/activities' },
      { label: 'Participants', routerLink: '/participants' },  
    ];

    

    
  }
  storePlanInLocalStorage(plan: any): void {
    localStorage.setItem('planData', JSON.stringify(plan)); // تخزين البيانات كـ JSON
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
openFilterAlertDialog(){
   
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

//////////////////////////////integration of payment section /////////////////////////////////////////////////////////
 

 


//////////////////////////////get subscription alert/////////////////////////////
 


 
loadParticipants(pageNo:any,pageSize:any,selectedType:any,selectedID:any) {
  this.gatewayService.getAllParticipantsActivity(pageNo, pageSize, selectedType, selectedID)
    .subscribe(
      (response) => {
        console.log(' participants', response);
 
        // this.participants=response.data
      },
      (error) => {
        console.error('Error:', error);
        // this.messageService.add({ severity: 'error', summary:'Failed', detail:error.message });
  
      }
    );
}
 

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

}
