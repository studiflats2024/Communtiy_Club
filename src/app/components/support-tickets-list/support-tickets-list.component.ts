import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { SupportTicketsService, UpdateStatusRequest } from '../../services/support-tickets.service';

@Component({
  selector: 'app-support-tickets-list',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    BreadcrumbModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    OverlayPanelModule,
  ],
  templateUrl: './support-tickets-list.component.html',
  styleUrl: './support-tickets-list.component.css',
  providers: [MessageService]
})
export class SupportTicketsListComponent {

  items = [
    { label: 'Dashboard', routerLink: '/dashboard' },
    { label: 'Support Tickets', routerLink: '/ticket-list' }
  ];

  statistics: any;
  ticketList: any[] = [];
  payload: UpdateStatusRequest | null = null;

  // Table data
  loading: boolean = false;
  searchFilter?: string = '';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;

  constructor(private ticketService: SupportTicketsService, private messageService: MessageService) { }

  // ngOnInit() {
  //   this.loadTicketsList();
  // }

  loadTicketsList() {
    this.loading = true;
    this.ticketService.getTicketsList(this.currentPage, this.pageSize, this.searchFilter).subscribe({
      next: (res: any) => {
        console.log(res);

        this.statistics = res.statistics;
        this.ticketList = res.tickets.data;
        this.totalRecords = res.tickets.totalRecords;
        this.currentPage = res.tickets.currentPage;

        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching tickets list:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch tickets list'
        });
        this.loading = false;
      }
    })
  }

  applyGlobalFilter() {
    this.currentPage = 1;
    this.loadTicketsList();
  }

  // ==================== Pagination ====================
  pageChange(event: any): void {
    this.currentPage = (event?.page ?? 0) + 1;
    this.pageSize = event?.rows ?? this.pageSize;

  }

  onLazyLoad(event: any): void {
    const first = event?.first ?? 0;
    const rows = event?.rows ?? this.pageSize;

    this.currentPage = Math.floor(first / rows) + 1;
    this.pageSize = rows;

    this.loadTicketsList();
  }

  getStatusColor(label: string): string {
    const colors: Record<string, string> = {
      'Pending': '#BE8B11',
      'Closed': '#C1111A',
      'Solved': '#17894E'
    };
    return colors[label] || '#BE8B11';
  }

  getStatusBgColor(label: string): string {
    const bgs: Record<string, string> = {
      'Pending': '#FDF8EC',
      'Closed': '#FEF6F6',
      'Solved': '#F2FDF7'
    };
    return bgs[label] || '#F3F4F6';
  }

  // ==================== Update Ticket Status ====================
  updateStatus(ticketId: string, newStatus: string) {
    this.ticketService.updateTicketStatus(ticketId, newStatus).subscribe({
      next: (res) => {
        console.log(res);

        const updatedTicket = res?.data || res;

        const index = this.ticketList.findIndex(t => t.ticket_ID === ticketId);
        if (index !== -1) {
          this.ticketList[index] = {
            ...this.ticketList[index],
            ...updatedTicket
          };
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Ticket marked as ${newStatus}`
        });

        this.loadTicketsList();
      },

      error: (err) => {
        console.error(err);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update ticket'
        });
      }
    });
  }

}
