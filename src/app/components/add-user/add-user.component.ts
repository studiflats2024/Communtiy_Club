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
  selector: 'app-add-user',
  standalone: true,
  imports: [PasswordModule,CardModule,RadioButtonModule,CheckboxModule,ChipModule,InputNumberModule,ToastModule,MultiSelectModule,CalendarModule,DragDropModule,ButtonModule,GalleriaModule,FileUploadModule,InputTextareaModule,DropdownModule,InputTextModule,DialogModule,CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule ],
  providers: [MessageService],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements AfterViewInit {


  randomSuffix = Math.random().toString(36).substring(2, 8);

  phoneNumber:any
  password:any
  ConfirmPass:any
  about:any

phone:any
whatsapp:any
  ngAfterViewInit() {

    setTimeout(() => {
      let input = document.getElementById('whatsapp') as HTMLInputElement;
      if (input) {
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('spellcheck', 'false');
        input.value = ''; // Clear any prefilled value
      }
    }, 500)
    setTimeout(() => {
      let input = document.getElementById('email') as HTMLInputElement;
      if (input) {
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('spellcheck', 'false');
        input.value = ''; // Clear any prefilled value
      }
    }, 1000);

    setTimeout(() => {
      let input = document.querySelector('.p-password input') as HTMLInputElement;
    if (input) {
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('autocorrect', 'off');
      input.setAttribute('spellcheck', 'false');
      input.value = '';  // ✅ Clear autofill

      // ✅ Add event listener to clear on focus
      input.addEventListener('focus', () => {
        input.value = '';
      });
    }
    }, 1000);
    // Initialize phone input
    this.initializeIntlTelInput('#phone');
    this.initializeIntlTelInput('#whatsapp');
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
 



initializeIntlTelInput(selector: string) {
  console.log(selector)
  const input = document.querySelector(selector) as HTMLInputElement;

  if (input) {
    const iti = intlTelInput(input, {
      initialCountry: 'de',   
      separateDialCode: true,  
      utilsScript: "../../../../node_modules/intl-tel-input/build/js/utils.js",
    });
    console.log('✅ intlTelInput initialized:', iti);
    
    // input.addEventListener('blur', () => {
    //   console.log(iti.getNumber(),input.value)
    //   const fullNumber = iti.getNumber();
    //   const countryCode = iti.getSelectedCountryData().dialCode;

    //   console.log('Full Number:', fullNumber);
    //   console.log('Country Code:', countryCode);

    //   if (selector === '#phone') {
    //     this.phone = fullNumber; 
    //   } else if (selector === '#whatsapp') {
    //     this.whatsapp = fullNumber;
    //   }

    //   console.log(this.phone, this.whatsapp);
    // });
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
      console.log('Country changed');

      const selectedCountryData = iti.getSelectedCountryData();
      console.log("New Country:", selectedCountryData.name, "| Dial Code: +" + selectedCountryData.dialCode);

 
      const dialCodeElement = input.parentElement?.querySelector(".iti__dial-code");
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
  constructor(private router: Router,private gatewayService:GatewayService,private messageService: MessageService,private plansService: PlansService) {}
  ngOnInit() {

 
 

    this.items = [
      { label: 'Community Club', routerLink: '/dashboard' },

      { label: 'Users', routerLink: '/users' },


      { label: 'Add New User', routerLink: '/add-new-user' },
      
    ];

     
        this.roles = [
          { name: 'Community Admin', id: 1 },
          { name: 'Instructor', id: 2 },
          { name: 'Accounted', id: 3 },

         
        ];
    
  }

 
  // Mock submit function to simulate API interaction
  submitAdmin(): void {
console.log(this.phone,this.whatsapp)

if (
  !this.firstName ||
  !this.lastName ||
  !this.userEmail ||
  !this.selectedRole?.name ||
  !this.phone ||
  !this.whatsapp ||
  !this.password ||
  !this.ConfirmPass ||
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

if (this.password !== this.ConfirmPass) {
  console.error("❌ Passwords do not match!");
  this.messageService.add({
    severity: 'Error',
    summary: 'error',
    detail: "❌ Passwords do not match!"
  });
  return; // 🚨 Stops execution if passwords don't match
}
   

    const newAdmin = {
      first_Name:this.firstName,
      last_Name: this.lastName,
      email: this.userEmail,
      role: this.selectedRole.name,
      phone_No: this.phone,
      wa_No: this.whatsapp,
      password: this.password,
      confirm_Password: this.ConfirmPass,
      about: this.about
    };
    

    this.gatewayService.addAdmin(newAdmin).subscribe({
      next: (response) => {
        console.log('Admin added successfully:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message
        });
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Error adding admin:', error);
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
