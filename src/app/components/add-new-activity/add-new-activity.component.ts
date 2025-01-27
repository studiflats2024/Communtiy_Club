import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgClass } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
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
  selector: 'app-add-new-activity',
  standalone: true,
  imports: [CardModule,RadioButtonModule,CheckboxModule,ChipModule,InputNumberModule,ToastModule,MultiSelectModule,CalendarModule,DragDropModule,ButtonModule,GalleriaModule,FileUploadModule,InputTextareaModule,DropdownModule,InputTextModule,DialogModule,CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule ],
  providers: [MessageService],
  
  templateUrl: './add-new-activity.component.html',
  styleUrl: './add-new-activity.component.css'
})
export class AddNewActivityComponent {



  images: any[] = [];
  draggedImage: any;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  onImageSelect(event: any) {
    for (let file of event.files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push({
          src: e.target.result,
          alt: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  onDragStart(event: any, img: any) {
    this.draggedImage = img;
  }

  onDrop(event: any, index: number) {
    if (this.draggedImage) {
      const draggedIndex = this.images.indexOf(this.draggedImage);
      this.images.splice(draggedIndex, 1); // Remove from original position
      this.images.splice(index, 0, this.draggedImage); // Insert at new position
      this.draggedImage = null; // Reset
    }
  }

  onDragEnd(event: any) {
    this.draggedImage = null;
  }

  onDragEnter(event: any, index: number) {
    // Optional: Handle visual effects for drag over
  }


  activityTypes = [
    { label: 'Course', value: 'course' },
    { label: 'Event', value: 'event' },
    { label: 'Workshop', value: 'workshop' },
    { label: 'Consultant Sessions', value: 'consultant' },
  ];

  selectedActivityType: any; 

  location:string=''
////////////////////////////////////////////////////////////////////////external code should be removed/////////////////
  
  items: any[] = [];
  title:string=''

 
//   durations: { name: string; value: number }[] = [];
//   plans: { name: string; id: number }[] = [];

  
//   planName: string = '';
// selectedDuration: any = null;
// selectedPlan: any = null;
// price: number =0;
// discount: number =0;
// finalPrice: number =0;
// invitationNo: any;
// features: string = '';
discription:string=''

  
  constructor(private messageService: MessageService,private plansService: PlansService) {}
  ngOnInit() {

 


    this.items = [
      { label: 'Community Club', routerLink: '/dashboard' },

      { label: 'Activities', routerLink: '/activities' },


      { label: 'Add New Activity', routerLink: '/add-new-activity' },
      
    ];
 
    
  }
 

  
/////////////////////////////add new course ////////////////////////////////////////////
seatsAvailable: number | null = null;
startDate: Date | null = null;
endDate: Date | null = null;
displayOnApp: string = 'no';

sessions = [
  { title: '', date: null, startTime: null, endTime: null, addVideo: 'no', videoLink: '' }
];

// إضافة سيشن جديد
addNewSession() {
  this.sessions.push({ title: '', date: null, startTime: null, endTime: null, addVideo: 'no', videoLink: '' });
}

// حذف سيشن
deleteSession(index: number) {
  this.sessions.splice(index, 1);
}

addVideo: string = 'no';  
videoLink: string = '';


///////////////////////////////////////////////event ///////////////////////////////////////////
eventDate: Date | null = null;
 
startTime: Date | null = null;
endTime: Date | null = null;
displayOnHomeScreen: string = 'no';

/////////////////////////////////////////////////consultant///////////////////////////////////////////
days = [
  { name: 'Saturday', selected: false, startTime: null, endTime: null, seats: null },
  { name: 'Sunday', selected: false, startTime: null, endTime: null, seats: null },
  { name: 'Monday', selected: false, startTime: null, endTime: null, seats: null },
  { name: 'Tuesday', selected: false, startTime: null, endTime: null, seats: null },
  { name: 'Wednesday', selected: false, startTime: null, endTime: null, seats: null },
  { name: 'Thursday', selected: false, startTime: null, endTime: null, seats: null },
  { name: 'Friday', selected: false, startTime: null, endTime: null, seats: null },
];
  
}
