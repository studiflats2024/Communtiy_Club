import {ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Provides ngIf, ngFor
import { FormsModule, MinLengthValidator } from '@angular/forms';    // Provides ngModel, form directives

 
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
import { Chart } from 'chart.js';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CircularChartComponent } from '../circular-chart/circular-chart.component';

// Chart.register({
//   id: 'staticLabels',
//   beforeDraw: (chart) => {
//     const ctx = chart.ctx;
//     ctx.font = '14px Arial';
//     ctx.fillStyle = '#5A6473';
//     ctx.textAlign = 'center';

//     chart.data.datasets.forEach((dataset, i) => {
//       dataset.data.forEach((value, index) => {
//         const meta = chart.getDatasetMeta(i);
//         const bar = meta.data[index];
//         if (bar) {
//           const x = bar.x; 
//           const y = bar.y - 10;  
//           ctx.fillText(`${value} Members`, x, y);
//         }
//       });
//     });
//   }
// });


@Component({
  selector: 'app-dashboard',
  standalone: true,
   
  imports: [CircularChartComponent,ProgressSpinnerModule,ProgressBarModule,ChartModule, OverlayPanelModule,CalendarModule,ReactiveFormsModule,PaginatorModule,BreadcrumbModule,CommonModule, DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],
  providers: [MessageService ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  progressValue = 10; // يبدأ من 10%

  increaseProgress() {
    if (this.progressValue < 100) {
      this.progressValue += 10;
      console.log('Updated Progress:', this.progressValue); // ✅ تحقق أن progressValue يتغير
    }
  }


  items:any[]=[];

  revenueData: any;
  revenueOptions: any;
  revenueValue = "€30.7k"; // Revenue summary value
  percentageChange = "1.3%"; // Percentage increase
  // selectedFilter:any

  legendItems:any;

  chartDataProgress:any
  chartOptionsProgress:any
 

  ngOnInit() {

 


    this.items = [
      { label: 'Dashboard', routerLink: '/dashboard' },
      
    ];

    this.legendItems = [
      { label: 'Annual', value: 20000, color: '#1F5BD6' },
      { label: 'Semi-Annual', value: 7000, color: '#73A7FB' },
      { label: 'Monthly Plan', value: 3000, color: '#DCE6F8' }
    ];
    


    this.loadPlans()

   this.paymentRecords = [
    {
      name: 'Ahmed Ali',
      email: 'Ahmed.Ali@gmail.com',
      phone: '+49 128 45987564',
      date: new Date('2025-02-12T10:00:00'),
      amount: 480,
      status: 'Success',
    },
    {
      name: 'Ahmed Ali',
      email: 'Ahmed.Ali@gmail.com',
      phone: '+49 128 45987564',
      date: new Date('2025-02-12T10:00:00'),
      amount: 480,
      status: 'Success',
    },
    {
      name: 'Ahmed Ali',
      email: 'Ahmed.Ali@gmail.com',
      phone: '+49 128 45987564',
      date: new Date('2025-02-12T10:00:00'),
      amount: 480,
      status: 'Failed',
    },
    {
      name: 'Ahmed Ali',
      email: 'Ahmed.Ali@gmail.com',
      phone: '+49 128 45987564',
      date: new Date('2025-02-12T10:00:00'),
      amount: 480,
      status: 'Success',
    },
  ];
  
    
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
  

 
  
  revenueChartData: any;
  revenueChartOptions: any;
  revenueChartData2: any;
  revenueChartOptions2: any;
  revenueChartData3: any;
  revenueChartOptions3: any;
  selectedFilter: string = 'Last 3 Month';
  subscribers:any[]=[]

  chartBarData: any;
  chartBarOptions: any;
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
          // barPercentage: 0.1, 
          // categoryPercentage: 0.2,  
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
  //////////////////////////////////////////////////////////
  this.revenueChartData = {
    labels: ['Annual', 'Semi-Annual', 'Monthly Plan'],
    datasets: [
      {
        data: [20000, 7000, 3000], // Revenue Values
        backgroundColor: ['#2462FC', '#80B1FF', '#D6E4FF'], // Colors
        hoverBackgroundColor: ['#1A4AC7', '#6699FF', '#B3CCFF'], // Hover effect
        borderWidth: 0 // Removes border
      }
    ]
  };

  this.revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%', // Creates the "donut" effect
    plugins: {
      legend: { display: false },
      tooltip: {
         
        callbacks: {
          label: (tooltipItem: any) =>
            `€${tooltipItem.raw.toLocaleString()}`
        }
      },
      beforeDraw: (chart: any) => {
        const ctx = chart.ctx;
        const width = chart.width;
        const height = chart.height;
  
        ctx.restore();
        const fontSize:any = (height / 200).toFixed(2);
        ctx.font = `${fontSize}em Arial`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
  
        const centerX = width / 2;
        const centerY = height / 2;
  
        ctx.fillStyle = '#6C757D'; // ✅ Text Color
        ctx.fillText('Total Revenue', centerX, centerY - 15);
        ctx.font = `bold ${fontSize * 1.5}em Arial`;
        ctx.fillStyle = '#000'; // ✅ Bold Black for Revenue
        ctx.fillText('€30,000', centerX, centerY + 15);
        ctx.save();
      }
    
    },
    datasets: {
      doughnut: {
        borderWidth: 3, // ✅ Adjusts segment border width
        borderColor: '#FFFFFF', // ✅ White border around segments
        hoverOffset: 10, // ✅ Expands segment when hovered
        cutout: '85%', // ✅ Creates the doughnut effect
        borderRadius: 8, // ✅ Smooth curved edges
        spacing: 3, // ✅ Space between segments
        backgroundColor: (context: any) => {
          // ✅ Customizing colors dynamically
          const value = context.dataset.data[context.dataIndex];
          return value > 10000 ? '#2462FC' : '#F0A500';
        }
      }
    },
   
    
  };
//////////////////////////////////////////////////////
this.subscribers = [
  { type: 'Annual', percentage: 40, count: 10000, color: '#2D5D3D' },
  { type: 'Semi-Annual', percentage: 30, count: 5000, color: '#A6D388' },
  { type: 'Trial Month', percentage: 20, count: 100, color: '#889E66' },
  { type: 'Monthly', percentage: 10, count: 50, color: '#E9F5D0' }
];
this.setChartDataSubscribers()


////////////////////////////////////////////////////////////
//////////////////////////////////chartProgressSpinner////////////////
 this.revenueChartData2 = {
    labels: ['Expired', 'Not Expired' ],
    datasets: [
      {
        data: [20000, 7000], // Revenue Values
        backgroundColor: ['#1151B4', '#CFDCF0' ], // Colors
        hoverBackgroundColor: ['#1A4AC7', '#6699FF'], // Hover effect
        borderWidth: 0 // Removes border
      }
    ]
  };

  this.revenueChartOptions2 = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '90%', // Creates the "donut" effect
    plugins: {
      legend: { display: false },
      tooltip: {
         
        callbacks: {
          label: (tooltipItem: any) =>
            `€${tooltipItem.raw.toLocaleString()}`
        }
      },
      
    
    },
   
   
    
  };




  this.revenueChartData3 = {
    labels: ['Attended', 'Not Attended'],
    datasets: [
      {
        data: [20000, 7000], // Revenue Values
        backgroundColor: ['#1CA65F', '#EBEBEB' ], // Colors
        hoverBackgroundColor: ['#1A4AC7', '#6699FF'], // Hover effect
        borderWidth: 0 // Removes border
      }
    ]
  };

  this.revenueChartOptions3 = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '90%', // Creates the "donut" effect
    plugins: {
      legend: { display: false },
      tooltip: {
         
        callbacks: {
          label: (tooltipItem: any) =>
            `€${tooltipItem.raw.toLocaleString()}`
        }
      }, 
    
    },
   
   
    
  };

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////chart bar ////////////////////////////////////////
  this.chartBarData = {
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    datasets: [
      {
        label: 'Courses',
        backgroundColor: '#1151B4',
        data: [100, 105, 110, 108, 112, 109, 110, 111, 110, 113, 110, 112]
      },
      {
        label: 'Consultant',
        backgroundColor: '#F6A623',
        data: [150, 155, 160, 158, 162, 159, 160, 161, 160, 163, 160, 162]
      },
      {
        label: 'Events',
        backgroundColor: '#7B8D5C',
        data: [220, 225, 230, 228, 232, 229, 230, 231, 230, 233, 230, 232]
      },
      {
        label: 'Workshop',
        backgroundColor: '#D6C5FF',
        data: [290, 295, 300, 298, 302, 299, 300, 301, 300, 303, 300, 302]
      }
    ]
  };

  this.chartBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#636363'
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#636363' },
        grid: { display: false }
      },
      y: {
        ticks: { color: '#636363' },
        grid: { color: '#E0E0E0' }
      }
    }
  };


//////////////////////////////transaction//////////////////////
this.chartTransactionData = {
  labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Entry Rejections',
      borderColor: '#ff3d3d', // Red
      borderDash: [6, 6], // Dashed Line
      borderWidth: 2,
      fill: false,
      data: [0, 50, 60, 40, 20, 50, 10]
    },
    {
      label: 'Daily Transaction',
      borderColor: '#28a745', // Green
      borderDash: [6, 6], // Dashed Line
      borderWidth: 2,
      fill: false,
      data: [0, 150, 120, 80, 130, 70, 0]
    },
    {
      label: 'via Invitation',
      borderColor: '#0d6efd', // Blue
      borderDash: [6, 6], // Dashed Line
      borderWidth: 2,
      fill: false,
      data: [0, 130, 80, 50, 110, 90, 20]
    }
  ]
};

this.chartTransactionOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#333'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#555'
      },
      grid: {
        display: false
      }
    },
    y: {
      ticks: {
        color: '#555'
      },
      grid: {
        color: '#ddd'
      }
    }
  }
};


  }

  chartData: any;
  chartOptions: any;
  chartTransactionData: any;
  chartTransactionOptions: any;
  filters = [
    { label: 'Last 3 Month', value: 'Last 3 Month' },
    { label: 'Last 6 Month', value: 'Last 6 Month' },
    { label: 'Last Year', value: 'Last Year' }
  ];

  members = [
    { label: '10000 Member', value: 100, color: '#275d3c' },
    { label: '5000', value: 50, color: '#91d066' },
    { label: '100', value: 20, color: '#95a77b' },
    { label: '50', value: 10, color: '#eaf5da' }
  ];
  chartPlugins:any
  setChartDataSubscribers() {
    const members = [10000, 5000, 100, 50]; // Member data
    const maxMembers = Math.max(...members);
    this.chartData = {
      labels: ['Annual', 'Semi-Annual', 'Trial Month', 'Monthly'],
      datasets: [
        {
          // label: 'Subscribers',
          data: members,
          backgroundColor: ['#336445', '#97CC68', '#96B279', '#EFFAE4'],
          borderRadius: 9,
          categoryPercentage: 1.0, // ✅ Ensures bars take full space
          barPercentage: 0.8, // ✅ Makes sure bars have enough width
          barThickness: (ctx: any) => {
            if (!ctx.chart.chartArea) {
                console.log("⏳ Chart area not ready, returning default size.");
                return 50; // Return default size while chart is preparing
            }
        
            const dataset = ctx.dataset;
            const index = ctx.datasetIndex; // 🔹 Ensure dataIndex exists
           console.log(ctx)
            if (typeof index === "undefined" || !dataset || !dataset.data || typeof dataset.data[index] === "undefined") {
                console.warn(`⚠️ Warning: Data for index ${index} is undefined. Check dataset.`);
                return 50; // Return default size to prevent bars from disappearing
            }
        
            const value = dataset.data[index]; // ✅ Properly access data
            console.log("✅ Bar value:", value);
            
            const maxMembers = Math.max(...dataset.data); // ✅ إيجاد القيمة القصوى
            const maxWidth = 250;  // ✅ الحد الأقصى لعرض البار
            const minWidth = 20;   // ✅ الحد الأدنى لعرض البار
        
            const proportion = value / maxMembers; // ✅ حساب النسبة المئوية للبار
        
            return Math.max(proportion * maxWidth, minWidth); 
        }
        
        
          
          ,
          // maxBarThickness: 60 
        MinLength:60
    
        }
      ]
    };

    this.chartOptions = {
      indexAxis: 'x', 
      responsive: true,
      maintainAspectRatio: false,
      // layout: {
      //   padding: { top: 10, bottom: 10 }
      // },
      plugins: {
        legend: {
          display: false  
          // padding: { top: 10, bottom: 10 }
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) => {
              return `${tooltipItem.raw} Members`;
            }
          }
        },
        staticLabels: true 
      },
      scales: {
        // x: {
        //   grid: {
        //     display: false
        //   },
        //   ticks: {
        //     color: '#68748A',
        //     font: { weight: 'bold' }
        //   }
        // },
        // y: {
        //   beginAtZero: true,
        //   grid: {
        //     display: false
        //   },
        //   ticks: {
        //     color: '#68748A',
        //     font: { weight: 'bold' }
        //   }
        // }

        // x: {
        //   display: false  
        // },
        x: {
          // type: 'linear',
          display: false,
          // grid: { display: false },
          // min: 0,
          max: maxMembers // ✅ Ensures proportional width
        },
        y: {
          display: false ,// ✅ Hides y-axis labels
          grid: { display: false }
        }
      }
    };





     // ✅ Attach the plugin ONLY to this chart instance
     this.chartPlugins = [
      {
        id: 'staticLabels',
        beforeDraw: (chart:any) => {
          const ctx = chart.ctx;
          ctx.font = '14px Arial';
          ctx.fillStyle = '#5A6473';
          ctx.textAlign = 'center';

          chart.data.datasets.forEach((dataset:any, i:any) => {
            dataset.data.forEach((value:any, index:any) => {
              const meta = chart.getDatasetMeta(i);
              const bar = meta.data[index];
              if (bar) {
                const x = bar.x; // ✅ Center above each bar
                const y = bar.y - 10; // ✅ Position slightly above bar
                ctx.fillText(`${value} Members`, x, y);
              }
            });
          });
        }
      }
    ];
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
    if (lowerPlanType.includes('semi-annual')) return 'badge-semi-annual';
    if (lowerPlanType.includes('annual')) return 'badge-annual';
    if (lowerPlanType.includes('free trial')) return 'badge-free-trial';
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
    if (lowerPlanType.includes('semi-annual')) return 'pi pi-calendar';
    if (lowerPlanType.includes('annual')) return 'pi pi-star';
    if (lowerPlanType.includes('free trial')) return 'pi pi-gift';
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
 
 



activeIndex: number = 0;
onTabChange(index: number): void {
  console.log('Active tab index changed:', index);
  this.activeIndex = index;
  if(index===0){
 
  }else if(index===1){
   
  }else if(index===2){
  
    
  }else if(index===3){
     
    
    
  }else if(index===4){
    
   
  }
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
