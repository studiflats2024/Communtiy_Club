import {ChangeDetectionStrategy, Component } from '@angular/core';
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
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
   
  imports: [ChartModule, OverlayPanelModule,CalendarModule,ReactiveFormsModule,PaginatorModule,BreadcrumbModule,CommonModule, DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],
  providers: [MessageService ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  items:any[]=[];

  revenueData: any;
  revenueOptions: any;
  revenueValue = "€30.7k"; // Revenue summary value
  percentageChange = "1.3%"; // Percentage increase
  selectedFilter:any
  ngOnInit() {

 


    this.items = [
      { label: 'Dashboard', routerLink: '/dashboard' },
      
    ];


    this.loadPlans()

    
  }




 
  globalFilter: string = '';
  subscriptions: any[] = [];
  paymentRecords: any[] = [];
  status: { label: string; value: string; class: string; selected: boolean;classF:string }[] = [
    { label: 'All', value: 'all', class: 'custom-button-add', selected: false ,classF:'custom-button' },
    { label: 'Success', value: 'success', class: 'p-tag-success', selected: false ,classF:''},
    { label: 'Failed', value: 'failed', class: 'p-tag-danger', selected: false,classF:'' },
    { label: 'Pending', value: 'pending', class: 'p-tag-warning', selected: false,classF:'selected-pending' },
  ];
  

 
  


  constructor( private gatewayService:GatewayService,private plansService: PlansService, private messageService: MessageService) {
  
    this.revenueData = {
      labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      datasets: [
        {
          label: 'Revenue',
          backgroundColor: ['#2462FC', '#F0A500', '#2462FC', '#D62828', '#2BA84A', '#2462FC', '#2462FC', '#2462FC', '#F0A500', '#2462FC', '#D62828', '#2462FC'],
          borderRadius: 5, 
          data: [30000, 15000, 35000, 5000, 45258, 25000, 30000, 27000, 16000, 34000, 6000, 31000]
        }
      ]
    }


    this.revenueOptions = {
      responsive: true,
      // maintainAspectRatio: false, 
      animation: {
        onComplete: function (chart:any) {  // ✅ Pass chart as parameter
          const chartInstance = chart.chart; // ✅ Access chart instance properly
          const dataset = chartInstance.data.datasets[0].data;
          const maxValue = Math.max(...dataset); // Get the highest value
          const maxIndex = dataset.indexOf(maxValue); // Get index of highest value
    
          // ✅ Set tooltip position on highest bar
          chartInstance.tooltip.setActiveElements([
            {
              datasetIndex: 0,
              index: maxIndex
            }
          ]);
    
          chartInstance.update(); // ✅ Refresh chart to show tooltip
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false,
          yAlign: 'bottom', // Make tooltip always appear above the bar
          
          backgroundColor: '#FFFFFF80',
      titleColor: '#6A7D98', // 🔹 Title text color
      titleFont: { size: 12, weight: 'bold' }, // 🔹 Title font style
      bodyColor: '#1151B4', // 🔹 Value text color
      bodyFont: { size: 12 }, // 🔹 Value font size
      borderColor: '#CFDCF0', // 🔹 Border color
      borderWidth: 1, // 🔹 Border thickness
      padding: 8, // 🔹 Padding inside tooltip
      cornerRadius: 8, // 🔹 Rounded corners
      fontFamily:'Poppins' ,
      callbacks: {
        label: (tooltipItem: any) => `€${tooltipItem.raw.toLocaleString()}`, // Format value
        title: (tooltipItems: any) => tooltipItems[0].label.toUpperCase() // Capitalize title (Month Name)
      }
          
          // callbacks: {
          //   label: (tooltipItem: any) => `€${tooltipItem.raw.toLocaleString()}`
          // }
        }
        
      },
      scales: {
        x: {
          grid: {
            display: false , 
            drawBorder: false,  
            drawOnChartArea: false,
          },
          barPercentage: 0.1, 
          categoryPercentage: 0.2,  
        },
        y: {
         
          beginAtZero: true,
          grid: {
            color: '#EAEAEA', // 🔹 لون خطوط الشبكة الأفقية
            drawBorder: false,
            // drawOnChartArea: false,
          },
         
          ticks: {
            callback: (value: number) => `${value / 1000}K`
          }
        }
      },
      datasets: {
        bar: {
          maxBarThickness: 10, // ✅ ضبط الحد الأقصى لعرض العمود
          minBarLength: 5 // ✅ التأكد من ظهور القيم الصغيرة
        }
      }
    };
  
   
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

 
 

 


//////////////////////////////get subscription alert/////////////////////////////
 
displayFilterAlert:boolean=false;
alertTo:any
alertfrom:any
 


pricingPlans:any[] = [];

plans: any[] = []; // To store fetched plans
errorMessage: string = '';
loadPlans(): void {
  this.plansService.getPlans().subscribe({
    next: (data) => {
      this.plans = data;
      this.pricingPlans=data.map((plan:any)=>({...plan,selected:false}))
      console.log('Plans fetched:', this.pricingPlans);
    },
    error: (error) => {
      this.errorMessage = error;
      console.error('Error fetching plans:', this.errorMessage);
    }
  });
}
 
 
}
