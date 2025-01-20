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
 

import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-add-new-plan',
  standalone: true,
  imports: [RadioButtonModule,CheckboxModule,ChipModule,InputNumberModule,ToastModule,MultiSelectModule,CalendarModule,DragDropModule,ButtonModule,GalleriaModule,FileUploadModule,InputTextareaModule,DropdownModule,InputTextModule,DialogModule,CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule ],

  templateUrl: './add-new-plan.component.html',
  styleUrl: './add-new-plan.component.css'
})
export class AddNewPlanComponent {
  items:any[]=[];
  ngOnInit() {

 


    this.items = [
      { label: 'Community Club', routerLink: '/' },

      { label: 'Manage Subscriptions', routerLink: '/manage-subscription' },


      { label: 'Add New Plan', routerLink: '/add-new-plan' },
      
    ];
    
  }
}
