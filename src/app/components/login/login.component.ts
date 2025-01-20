import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api'; // Assuming you're using PrimeNG for message service
import { PrimeNGConfig } from 'primeng/api'; // PrimeNG config
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Fixed styleUrls
  providers: [MessageService]
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  passwordVisible = false; // Flag for toggling password visibility

  constructor(
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

    // Stop if the form is invalid
    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill in all fields correctly.'
      });
      return;
    }

    this.loading = true;

    this.authService.login(this.f['username'].value, this.f['password'].value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: 'Redirecting to dashboard...'
        });
        this.router.navigate(['']); // Redirect to the dashboard or desired route
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Invalid username or password.'
        });
        this.loading = false;
      }
    });
  }
}
