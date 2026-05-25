import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ContactUs_Details, ContactUs_Reply, ContactUsService } from '../../services/contact-us.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [
    BreadcrumbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css',
  providers: [MessageService]
})
export class ContactDetailsComponent {

  items = [
    { label: 'Dashboard', routerLink: '/dashboard' },
    { label: 'Contact Us Requests', routerLink: '/contact-list' },
    { label: 'View Details', routerLink: '/contact-details' }
  ];

  contact: ContactUs_Details | null = null;
  contactId: string = '';
  isLoading = false;

  toggle: boolean = false;

  isSubmitted = false;
  subject: string = '';
  replyMessage: string = '';
  readonly maxLength = 100;
  contactReplyForm: any;

  constructor(
    private messageService: MessageService,
    private ContactService: ContactUsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.contactReplyForm = this.fb.group({
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.maxLength(this.maxLength)]]
    });
  }

  ngOnInit() {
    this.contactId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.contactId) {
      this.loadContactDetails();
    }
  }

  loadContactDetails() {
    this.isLoading = true;
    this.ContactService.contactDetails(this.contactId).subscribe({
      next: (res) => {
        console.log(res);

        this.contact = res;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load contact details. Please try again later.' });
      }
    });

  }

  cancelReply() {
    this.router.navigate(['/contact-list']);
  }

  reply() {
    this.toggle = true;
  }

  cancelEmail() {
    this.toggle = false;
    this.subject = '';
    this.replyMessage = '';
  }

  sendEmail() {
    this.contactReplyForm.markAllAsTouched();

    if (this.contactReplyForm.invalid) {
      return;
    }

    const { subject, message } =
      this.contactReplyForm.getRawValue();

    if (!this.contact?.request_ID) return;

    const payload: ContactUs_Reply = {
      request_ID: this.contact.request_ID,
      reply_Message: message!.trim()
    };

    this.isLoading = true;

    this.ContactService.replyToRequest(payload)
      .subscribe({
        next: () => {
          this.isLoading = false;

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Reply sent successfully.'
          });

          this.contactReplyForm.reset();

          setTimeout(() => {
            this.router.navigate(['/contact-list']);
          }, 1500);
        },

        error: () => {
          this.isLoading = false;

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to send reply. Please try again.'
          });
        }
      });
  }

  get subjectError(): string {
    if (!this.isSubmitted) return '';

    if (!this.subject?.trim()) {
      return 'Subject is required';
    }

    return '';
  }

  get messageError(): string {
    if (!this.isSubmitted) return '';

    const message = this.replyMessage?.trim();

    if (!message) {
      return 'Message is required';
    }

    if (message.length > this.maxLength) {
      return `Message cannot exceed ${this.maxLength} characters`;
    }

    return '';
  }

  getStatusColor(label: string): string {
    const colors: Record<string, string> = {
      'Pending': '#BE8B11',
      'Responded': '#17894E'
    };
    return colors[label] || '#BE8B11';
  }

  getStatusBgColor(label: string): string {
    const bgs: Record<string, string> = {
      'Pending': '#FDF8EC',
      'Responded': '#F2FDF7'
    };
    return bgs[label] || '#F3F4F6';
  }

}
