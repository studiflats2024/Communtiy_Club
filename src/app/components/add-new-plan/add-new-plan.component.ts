import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgClass } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';  // File upload
import { GalleriaModule } from 'primeng/galleria';      // Image gallery
import { ButtonModule } from 'primeng/button';
import { DragDropModule } from 'primeng/dragdrop';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

import { Router, ActivatedRoute } from '@angular/router';
import { MenuModule } from 'primeng/menu';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

import { MultiSelectModule } from 'primeng/multiselect';
import { PlansService } from '../../services/plans.service';




@Component({
  selector: 'app-add-new-plan',
  standalone: true,
  imports: [CardModule,RadioButtonModule,CheckboxModule,ChipModule,InputNumberModule,ToastModule,MultiSelectModule,CalendarModule,DragDropModule,ButtonModule,GalleriaModule,FileUploadModule,InputTextareaModule,DropdownModule,InputTextModule,DialogModule,CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule ],
  providers: [MessageService],
  templateUrl: './add-new-plan.component.html',
  styleUrl: './add-new-plan.component.css'
})
export class AddNewPlanComponent {
  // Breadcrumb items for navigation
  items: any[] = [];
  trial:boolean=false;

  // Dropdown options for duration and plans
  durations: { name: string; value: number }[] = [];
  plans: { name: string; id: number }[] = [];

  // Form field bindings
  planName: string = '';
selectedDuration: any = null;
selectedPlan: any = null;
price: number =0;
discount: number =0;
finalPrice: number =0;
invitationNo: any;
features: string = '';

  
  constructor(private messageService: MessageService,private plansService: PlansService) {}
  ngOnInit() {

 
this.calculateFinalPrice()

    this.items = [
      { label: 'Community Club', routerLink: '/dashboard' },

      { label: 'Manage Subscriptions', routerLink: '/manage-subscription' },


      { label: 'Add New Plan', routerLink: '/add-new-plan' },
      
    ];

        // Initialize dropdown options
        this.durations = [
          { name: 'Year', value: 1 },
          { name: '6 Months', value: 3 },
          { name: '3 Months', value: 3 },
  
          { name: 'Month', value: 6 },
         
        ];
    
        this.plans = [
          { name: 'Most Popular', id: 1 },
          { name: 'Most Value', id: 2 },
         
        ];
    
  }

   // Calculate the final price based on price and discount
   calculateFinalPrice(): void {
    if (this.price && this.discount) {
      this.finalPrice = this.price - this.price * (this.discount / 100);
    } else {
      this.finalPrice = this.price;
    }
  }

  // Mock submit function to simulate API interaction
  submitPlan(): void {


    if (!this.planName || !this.selectedPlan?.name || !this.selectedDuration?.name || !this.price  ) {
      // Show error toast for validation failure
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields before submitting.',
      });
      return; 
    }
   

    const formattedPlan = {
      plan_Name: this.planName,
      plan_Type: this.selectedPlan?.name || '',
      plan_Duration: this.selectedDuration?.name || '',
      invitation_NOs: this.invitationNo,
      plan_Price: this.price,
      plan_Discount: this.discount,
      plan_Fianl_Price: this.finalPrice,
      plan_Features: this.features.split(','), // Split features into an array
      is_Trial:this.trial
    };
    

    // Call the service to send the data
    this.plansService.addNewPlan(formattedPlan).subscribe({
      next: (response) => {
        console.log('Plan added successfully:', response);
         // Show success toast
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: response.message
    });
      },
      error: (error) => {
        console.error('Error adding plan:', error);
        this.messageService.add({
          severity: 'Error',
          summary: 'error',
          detail: error.message
        });
      }
    });
  
     
  }


  displayReminder: boolean = false;

  showReminder() {
    this.displayReminder = true;
  }
}
