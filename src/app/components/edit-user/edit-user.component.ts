import { Component, AfterViewInit } from '@angular/core';
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
// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import intlTelInput from 'intl-tel-input';
import { PasswordModule } from 'primeng/password';
import { GatewayService } from '../../services/gateway.service';


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [PasswordModule,CardModule,RadioButtonModule,CheckboxModule,ChipModule,InputNumberModule,ToastModule,MultiSelectModule,CalendarModule,DragDropModule,ButtonModule,GalleriaModule,FileUploadModule,InputTextareaModule,DropdownModule,InputTextModule,DialogModule,CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule ],
  providers: [MessageService],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {



  phoneNumber:any
  password:any
  ConfirmPass:any
  about:any

phone:any
whatsapp:any
  ngAfterViewInit() {
    
    // this.initializeIntlTelInput('#phone');
    // this.initializeIntlTelInput('#whatsapp');
    this.fetchAdminProfile(this.adminId)
  }
  // ngAfterViewChecked() {
  //   this.initializeIntlTelInput('#phone');
  //   this.initializeIntlTelInput('#whatsapp');
  // }

  // initializeIntlTelInput(selector: string) {
  //   const input = document.querySelector(selector) as HTMLInputElement;
     
  //   if (input) {
  //     const iti =intlTelInput(input, {
  //       initialCountry: 'de',   
  //       separateDialCode: true,  
  //       utilsScript: "../../../../node_modules/intl-tel-input/build/js/utils.js",
  //     });

 
     
  //   }
  // }
 

//////////////////////////////////////////////////////////////////////

// initializeIntlTelInput(selector: string) {
//   console.log(selector)
//   const input = document.querySelector(selector) as HTMLInputElement;

//   if (input) {
//     const iti = intlTelInput(input, {
//       initialCountry: 'de',   
//       separateDialCode: true,  
//       utilsScript: "../../../../node_modules/intl-tel-input/build/js/utils.js",
//     });
//     console.log('✅ intlTelInput initialized:', iti);
    
   
//     input.addEventListener('blur', () => {
//       const countryCode = iti.getSelectedCountryData().dialCode;  
//       let inputValue = input.value.trim();  
    
       
//       inputValue = inputValue.replace(/^0+/, '');
    
       
//       const fullNumber = `${countryCode}${inputValue}`;
    
//       console.log('🌍 Country Code:', countryCode); 
//       console.log('📞 User Input:', inputValue); 
//       console.log('✅ Final Merged Number:', fullNumber);
    
      
//       if (selector === '#phone') {
//         this.phone = fullNumber;
//       } else if (selector === '#whatsapp') {
//         this.whatsapp = fullNumber;
//       }
    
//       console.log('📌 Stored Phone:', this.phone, '📌 Stored WhatsApp:', this.whatsapp);
//     });
    
 
//     input.addEventListener("countrychange", () => {
//       console.log('Country changed');

//       const selectedCountryData = iti.getSelectedCountryData();
//       console.log("New Country:", selectedCountryData.name, "| Dial Code: +" + selectedCountryData.dialCode);

 
//       const dialCodeElement = input.parentElement?.querySelector(".iti__dial-code");
//       if (dialCodeElement) {
//         dialCodeElement.textContent = `+${selectedCountryData.dialCode}`;
//       }
//     });
//   }
// }

private itiInstances: Map<string, any> = new Map();

initializeIntlTelInput(selector: string, initialValue: string = '') {
  console.log(selector)
  const input = document.querySelector(selector) as HTMLInputElement;
   // ✅ Check if already initialized
   if (this.itiInstances.has(selector)  ) {
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

    if (initialValue) {
      console.log('📌 Initial Value from API:', initialValue);
    
      // Get current selected country
      const selectedCountry = iti.getSelectedCountryData();
      const dialCode = `+${selectedCountry.dialCode}`;
    
      // Ensure the initial value has a leading "+" before setting it
      if (!initialValue.startsWith('+')) {
        initialValue = `+${initialValue}`;
      }
    
      // Clear input before setting value
      input.value = '';
    
      setTimeout(() => {
        iti.setNumber(initialValue); // ✅ Now correctly sets the number
        console.log('📌 After setNumber:', iti.getNumber());
      }, 50);
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
  

  ///////////////////////////////////////////////////
    // Breadcrumb items for navigation
  items: any[] = [];
   
  roles: { name: string; id: number }[] = [];
  


 
selectedRole: any = null;

 
 
userEmail:string=''
firstName:string=''
lastName:string=''
adminId:any
  constructor(private route: ActivatedRoute,private router: Router,private gatewayService:GatewayService,private messageService: MessageService,private plansService: PlansService) {}
  ngOnInit() {

 
    this.adminId = this.route.snapshot.paramMap.get('id');
  
    if (this.adminId) {
     this.fetchAdminProfile(this.adminId)
    }

    this.items = [
      { label: 'Community Club', routerLink: '/dashboard' },

      { label: 'Users', routerLink: '/users' },


      { label: 'Update User', routerLink: '/edit-user' },
      
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
      this.firstName=this.adminProfile[0].firstName
      this.lastName=this.adminProfile[0].lastName
      console.log(this.firstName,this.lastName)

      this.userEmail=this.adminProfile[0].email
      this.about=this.adminProfile[0].about
      this.phone=this.adminProfile[0].phone
      this.whatsapp=this.adminProfile[0].wA_Number

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

 
  // Mock submit function to simulate API interaction
  submitAdmin(): void {
console.log(this.firstName,this.userEmail,this.phone,this.whatsapp,this.selectedRole?.name,this.about)

if (
  !this.firstName ||
 
  !this.userEmail ||
  !this.selectedRole?.name ||
  !this.phone ||
  !this.whatsapp ||
 
  !this.about
) {
  console.error("❌ All fields are required!");
  this.messageService.add({
    severity: 'Error',
    summary: 'error',
    detail: "❌ All fields are required!"
  });
  return; // 🚨 Stops execution if any field is empty
}

// if (this.password !== this.ConfirmPass) {
//   console.error("❌ Passwords do not match!");
//   this.messageService.add({
//     severity: 'Error',
//     summary: 'error',
//     detail: "❌ Passwords do not match!"
//   });
//   return;  
// }
   

    const newAdmin = {
      id:this.adminId,
      first_Name:this.firstName,
      last_Name: this.lastName,
      email: this.userEmail,
      role: this.selectedRole.name,
      phone_No: this.phone,
      wa_No: this.whatsapp,
      photo:this.adminProfile[0].user_Img,
      about: this.about
    };
    

    this.gatewayService.updateAdmin(newAdmin).subscribe({
      next: (response:any) => {
        console.log('Admin updated successfully:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message
        });
        this.router.navigate(['/users']);
      },
      error: (error:any) => {
        console.error('Error updating admin:', error);
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
