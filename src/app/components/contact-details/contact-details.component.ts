import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ContactUs_Details, ContactUs_Reply, ContactUsService } from '../../services/contact-us.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [
    BreadcrumbModule,
    CommonModule,
    FormsModule,
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


  // Reply form fields
  subject: string = '';
  replyMessage: string = '';
  readonly maxLength = 100;

  constructor(
    private messageService: MessageService,
    private ContactService: ContactUsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  // constructor(private messageService: MessageService, private ContactService: ContactUsService,
  //   private route: ActivatedRoute, private router: Router
  // ) { }

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

  // Send reply to API
  sendEmail() {
    if (!this.subject.trim() || !this.replyMessage.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please fill in both Subject and Message fields.'
      });
      return;
    }

    if (!this.contact?.request_ID) return;

    this.isLoading = true;

    const payload: ContactUs_Reply = {
      request_ID: this.contact.request_ID,
      reply_Message: this.replyMessage
    };

    this.ContactService.replyToRequest(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Reply sent successfully.'
        });
        // Go back to list after short delay so user sees the toast
        setTimeout(() => this.router.navigate(['/contact-list']), 1500);
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
