import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SupportTicket_Details, SupportTicketsService, Ticket_Issue_Type, Ticket_Status } from '../../services/support-tickets.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-support-tickets-details',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbModule,
    FormsModule,
    RouterModule,
    // ProgressSpinnerModule,
  ],
  templateUrl: './support-tickets-details.component.html',
  styleUrl: './support-tickets-details.component.css'
})
export class SupportTicketsDetailsComponent {

  items = [
    { label: 'Dashboard', routerLink: '/dashboard' },
    { label: 'Support Tickets', routerLink: '/ticket-list' },
    { label: 'View Details', routerLink: '/ticket-details' },
  ];

  ticket: SupportTicket_Details | null = null;
  isLoading = false;
  errorMessage = '';

  replyMessage = '';
  attachmentUrl: string | null = null;
  selectedFileName = '';
  isSending = false;
  isTextareaFocused = false;
  successMessage = '';
  replyError = '';

  private ticketId = '';

  constructor(
    private route: ActivatedRoute,
    private ticketService: SupportTicketsService
  ) { }

  ngOnInit(): void {
    this.ticketId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.ticketId) {
      this.loadTicketDetails();
    }
  }

  // Load ticket details
  loadTicketDetails(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.ticketService.getTicketDetails(this.ticketId).subscribe({
      next: (data) => {
        this.ticket = data;
        console.log(data);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load ticket details. Please try again.';
        this.isLoading = false;
        console.error('GetTicketDetails error:', err);
      },
    });
  }

  // Submit reply 
  submitReply(): void {
    if (!this.replyMessage.trim() || this.isSending) return;

    this.isSending = true;
    this.successMessage = '';
    this.replyError = '';

    const payload = {
      ticket_ID: this.ticketId,
      reply_Message: this.replyMessage.trim(),
      attachment_URL: this.attachmentUrl,
    };

    this.ticketService.addReply(payload).subscribe({
      next: (response) => {
        this.isSending = false;
        this.successMessage = response.message ?? 'Reply sent successfully.';
        this.replyMessage = '';
        this.attachmentUrl = null;
        this.selectedFileName = '';

        this.loadTicketDetails();

        setTimeout(() => (this.successMessage = ''), 4000);
      },
      error: (err) => {
        this.isSending = false;
        this.replyError = 'Failed to send reply. Please try again.';
        console.error('AddReply error:', err);

        setTimeout(() => (this.replyError = ''), 4000);
      },
    });
  }

  // File attachment 
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.selectedFileName = file.name;

    this.attachmentUrl = URL.createObjectURL(file);

    input.value = '';
  }

  removeAttachment(): void {
    this.attachmentUrl = null;
    this.selectedFileName = '';
  }

  getInitials(name: string | null): string {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  formatIssueType(type: Ticket_Issue_Type): string {
    const map: Record<Ticket_Issue_Type, string> = {
      Cancel_My_Plan: 'Cancel My Plan',
      Billing_Issue: 'Billing Issue',
      Technical_Issue: 'Technical Issue',
      Account_Issue: 'Account Issue',
      Other: 'Other',
    };
    return map[type] ?? type;
  }

  getStatusColor(label: Ticket_Status): string {
    const colors: Record<Ticket_Status, string> = {
      'Pending': '#BE8B11',
      'Closed': '#C1111A',
      'Solved': '#17894E'
    };
    return colors[label] ?? '#BE8B11';
  }

  getStatusBgColor(label: Ticket_Status): string {
    const bgs: Record<Ticket_Status, string> = {
      'Pending': '#FDF8EC',
      'Closed': '#FEF6F6',
      'Solved': '#F2FDF7'
    };
    return bgs[label] ?? '#F3F4F6';
  }

}
