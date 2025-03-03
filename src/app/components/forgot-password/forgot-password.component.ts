import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api'; // Assuming you're using PrimeNG for message service
import { PrimeNGConfig } from 'primeng/api'; // PrimeNG config
import { ToastModule } from 'primeng/toast';
import { InputOtpModule } from 'primeng/inputotp';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GatewayService } from '../../services/gateway.service';
 

 
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ FormsModule,NgClass,InputOtpModule,RouterModule,CommonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  providers: [MessageService]

})
export class ForgotPasswordComponent {
  firstStep:boolean=true;
  secondStep:boolean=false;
  otpValue:any

  loginForm!: FormGroup;
  emailForm!: FormGroup;

  loading = false;
  submitted = false;
  error = '';
  passwordVisible = false; // Flag for toggling password visibility

  constructor(
    private gatewayService:GatewayService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig // PrimeNG configuration
  ) {
    // Initialize the form group with form controls
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]], // Email validation
      password: ['', [Validators.required, Validators.minLength(6)]] // Password validation with min length
    });
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email validation
      
    });
  }

  ngOnInit() {
    this.primengConfig.ripple = true; // PrimeNG configuration if needed
  }


  // Convenience getter for easy access to form controls
  get f() {
    return this.loginForm.controls;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible; // Toggle password visibility
  }

  onSubmit() {
    this.submitted = true;

    if (this.emailForm.invalid) {
      return; // Stop if form is invalid
    }

    const email = this.emailForm.value.email;
    this.email=email
    this. requestOTP(email);
  }

  



  thirdStep:boolean=false
  //////////////////////////////////////
  showSec(){
    this.firstStep=false
    this.secondStep=true
  }
  showThird(){
    this.firstStep=false
    this.secondStep=false
    this.thirdStep=true
  }



  ///////////////////////////////////////////
  requestOTP(email: string) {
    this.gatewayService.generateOTP(email).subscribe(
      response => {
        console.log('OTP Response:', response);
        this.firstStep=false
    this.secondStep=true
      },
      error => {
        console.error('Error fetching OTP:', error);
      }
    );
  }




 
  email :any; // Should be dynamically set from the previous step
 
  verificationSuccess = false;
  errorMessage = '';

  verifyOTP() {
    if (!this.otpValue) {
      this.errorMessage = 'OTP is required';
      return;
    }

    this.gatewayService.validateOTP(this.email, this.otpValue).subscribe(
      response => {
        console.log('OTP Verified:', response);
        this.verificationSuccess = true;
        this.firstStep=false
    this.secondStep=false
    this.thirdStep=true
      },
      error => {
        console.error('OTP Verification Failed:', error);
        this.errorMessage = 'Invalid OTP, please try again.';
      }
    );
  }
}
