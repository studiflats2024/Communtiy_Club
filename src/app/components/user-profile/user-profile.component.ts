import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgClass } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ActivityService } from '../../services/activity.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { ActivatedRoute } from '@angular/router';






 
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';  // File upload
import { GalleriaModule } from 'primeng/galleria';      // Image gallery
 
import { DragDropModule } from 'primeng/dragdrop';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

 
import { MultiSelectModule } from 'primeng/multiselect';
import { PlansService } from '../../services/plans.service';
// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import intlTelInput from 'intl-tel-input';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [PasswordModule,CardModule,RadioButtonModule,CheckboxModule,ChipModule,InputNumberModule,ToastModule,MultiSelectModule,CalendarModule,DragDropModule,ButtonModule,GalleriaModule,FileUploadModule,InputTextareaModule,DropdownModule,InputTextModule,DialogModule,CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule,BadgeModule,TabViewModule,TagModule,TableModule,ButtonModule,MenuModule,OverlayPanelModule,CardModule,ToastModule,DialogModule,CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule ],
  providers: [MessageService],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  items:any;
  activeTab: string = 'personal-details';
  sessions : any[]=[]
constructor(private route: ActivatedRoute,private messageService:MessageService,private activityService:ActivityService){

}
activityId: any;
activityType: string | null = null;


roles: { name: string; id: number }[] = [];
selectedRole:any;
firstName:any
lastName:any
about:any
userEmail:any
currentPass:any
confirmNewPass:any
newPass:any

ngOnInit() {

  this.activityId = this.route.snapshot.paramMap.get('id');
  this.activityType = this.route.snapshot.paramMap.get('type');
  if (this.activityId&&this.activityType) {
   
  }


  this.items = [
    { label: 'Community Club', routerLink: '/dashboard' },

    { label: 'My Profile', routerLink: '/user-profile' },

 
    
  ];

  
}





ngAfterViewInit() {
  // Initialize phone input
  this.initializeIntlTelInput('#phone');
  this.initializeIntlTelInput('#whatsapp');
}
phoneInitialized = false;

ngAfterViewChecked() {
  if (this.activeTab === 'personal-details' && !this.phoneInitialized ) { 
    this.phoneInitialized = true;
    console.log('check')
    this.initializeIntlTelInput('#phone');
    this.initializeIntlTelInput('#whatsapp');
  }
}


initializeIntlTelInput(selector: string) {
  const input = document.querySelector(selector) as HTMLInputElement;
  if (input) {
    intlTelInput(input, {
      initialCountry: 'de',   
      separateDialCode: true,  
      utilsScript: "../../../../node_modules/intl-tel-input/build/js/utils.js",
    });



   
  }
}

personalSelect(){
  this.activeTab = 'change-password'
  this.phoneInitialized = false;

}
 

 
 


 
 



getActivityClass(activityType: string | null): string {
  if (!activityType) return '';

  switch (activityType.toLowerCase()) {
    case 'courses':
      return 'type-success';
    case 'consultant':
      return 'type-danger';
    case 'workshops':
      return 'type-purble';
    case 'events':
      return 'type';
    default:
      return 'type'; // Default styling
  }
}


}
