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
import { GatewayService } from '../../services/gateway.service';


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
constructor(private gatewayService:GatewayService,private route: ActivatedRoute,private messageService:MessageService,private activityService:ActivityService){

}
activityId: any;
activityType: string | null = null;
adminId:any

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

  this.adminId = this.route.snapshot.paramMap.get('id');
  
  if (this.adminId) {
   this.fetchAdminProfile(this.adminId)
  }


  this.items = [
    { label: 'Community Club', routerLink: '/dashboard' },
    { label: 'Users', routerLink: '/users' },
    
    { label: 'My Profile', routerLink: '/user-profile' },

 
    
  ];

  this.roles = [
    { name: 'Community Admin', id: 1 },
    { name: 'Instructor', id: 2 },
    { name: 'Accounted', id: 3 },

   
  ];
  
}

adminProfile :any
fetchAdminProfile(adminId: string) {
  this.gatewayService.getAdminProfile(adminId).subscribe({
    next: (response) => {
      console.log('✅ Admin Profile:', response);
      this.adminProfile = response;
      this.firstName=this.adminProfile[0].full_Name
      this.userEmail=this.adminProfile[0].email
      this.about=this.adminProfile[0].about
      // ✅ Auto-Select Role in Dropdown
      this.selectedRole = this.roles.find(role => role.name === this.adminProfile[0].role) || null;


      setTimeout(() => {
        this.initializeIntlTelInput('#phone', this.adminProfile[0].phone);
        this.initializeIntlTelInput('#whatsapp', this.adminProfile[0].wA_Number);
      }, 500);
      
      console.log( this.adminProfile)
    },
    error: (err) => {
      console.error('❌ Error fetching admin profile:', err);
    }
  });
}


setPhoneValues() {
  if (this.adminProfile.phone_No) {
    (document.getElementById('phone') as HTMLInputElement).value = this.adminProfile.phone_No;
  }
  if (this.adminProfile.wa_No) {
    (document.getElementById('whatsapp') as HTMLInputElement).value = this.adminProfile.wa_No;
  }
}

initializeIntlTelInputDetails(selector: string, initialValue: string = '') {
  const input = document.querySelector(selector) as HTMLInputElement;
  
  if (input) {
    const iti = intlTelInput(input, {
      initialCountry: 'auto',   
      separateDialCode: true,  
      utilsScript: "../../../../node_modules/intl-tel-input/build/js/utils.js",
    });

   
    if (initialValue) {
      iti.setNumber(initialValue);
    }
 
    input.addEventListener('blur', () => {
      const fullNumber = iti.getNumber();
      if (selector === '#phone') {
        this.adminProfile.phone_No = fullNumber;
      } else if (selector === '#whatsapp') {
        this.adminProfile.wa_No = fullNumber;
      }
      console.log(this.adminProfile.phone_No, this.adminProfile.wa_No);
    });
  }
}



ngAfterViewInit() {
  // Initialize phone input
  // this.initializeIntlTelInput('#phone');
  // this.initializeIntlTelInput('#whatsapp');
  this.fetchAdminProfile(this.adminId)

}
phoneInitialized = false;

viewCheck:boolean=false
ngAfterViewChecked() {
  if (this.activeTab === 'personal-details' && !this.phoneInitialized ) { 
    this.phoneInitialized = true;
    console.log('check')
    // this.initializeIntlTelInput('#phone');
    // this.initializeIntlTelInput('#whatsapp');
   this.fetchAdminProfile(this.adminId)

  }
}

phone:any
whatsapp:any
private itiInstances: Map<string, any> = new Map();
initializeIntlTelInput(selector: string, initialValue: string = '') {
  console.log(selector)
  const input = document.querySelector(selector) as HTMLInputElement;
   // ✅ Check if already initialized
   if (this.itiInstances.has(selector) && !this.phoneInitialized ) {
    console.log(`✅ intlTelInput already initialized for ${selector}`);
    return;
  }

  if (input) {
    const iti = intlTelInput(input, {
      initialCountry: 'de',   
      separateDialCode: true,  
      utilsScript: "../../../../node_modules/intl-tel-input/build/js/utils.js",
    });
    console.log('✅ intlTelInput initialized:', iti);
    this.itiInstances.set(selector, iti); // ✅ Store instance

    // ✅ Set Initial Value from API
    if (initialValue) {
      iti.setNumber(initialValue);
    }
    
 
    input.addEventListener('blur', () => {
      const countryCode = iti.getSelectedCountryData().dialCode; // ✅ Get country code without "+"
      let inputValue = input.value.trim(); // ✅ Get user input and trim spaces
    
      // ✅ Remove leading zeros from input value to avoid issues like "+491234" becoming "491234"
      inputValue = inputValue.replace(/^0+/, '');
    
      // ✅ Merge dial code and input value without "+"
      const fullNumber = `${countryCode}${inputValue}`;
    
      console.log('🌍 Country Code:', countryCode); 
      console.log('📞 User Input:', inputValue); 
      console.log('✅ Final Merged Number:', fullNumber);
    
      // ✅ Store in variables
      if (selector === '#phone') {
        this.phone = fullNumber;
      } else if (selector === '#whatsapp') {
        this.whatsapp = fullNumber;
      }
    
      console.log('📌 Stored Phone:', this.phone, '📌 Stored WhatsApp:', this.whatsapp);
    });
    
 
    input.addEventListener("countrychange", () => {
      ////////////////////////////////////////
      // const flagContainer = document.querySelector(".iti__selected-flag");
      // const dialCodeElement = document.querySelector(".iti__dial-code");
      // console.log(flagContainer,dialCodeElement)
  
      // if (flagContainer) {
      //     flagContainer.classList.remove("iti__selected-flag");
      // }
      // if (dialCodeElement) {
      //     dialCodeElement.textContent = '';
      // }
      /////////////////////////////////////
      console.log('Country changed');
      // iti.setNumber('');
      const selectedCountryData = iti.getSelectedCountryData();
      console.log("New Country:", selectedCountryData.name, "| Dial Code: +" + selectedCountryData.dialCode);

 
      const dialCodeElement = input.parentElement?.querySelector(".iti__dial-code");
       if (dialCodeElement) {
          dialCodeElement.textContent = '';
      }
      if (dialCodeElement) {
        dialCodeElement.textContent = `+${selectedCountryData.dialCode}`;
      }
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





changePassword() {
  this.gatewayService.updatePassword(this.adminId, this.currentPass, this.newPass, this.confirmNewPass)
    .subscribe({
      next: (res) => {
        console.log('✅ Password updated successfully:', res);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message
        });
      },
      error: (err) => {
        console.error('❌ Error updating password:', err);
        this.messageService.add({
          severity: 'Error',
          summary: 'error',
          detail: err.error.message
        });
      }
    });
}


}
