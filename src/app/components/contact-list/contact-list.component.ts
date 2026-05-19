import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ContactUs_StatusContactUs_Status, ContactUsService } from '../../services/contact-us.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-contact-list',
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
    DialogModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
  providers: [MessageService]
})
export class ContactListComponent {

  items = [
    { label: 'Dashboard', routerLink: '/dashboard' },
    { label: 'Contact Us Requests', routerLink: '/contact-list' }
  ];

  statistics: any;
  contactList: any[] = [];

  // Table data
  loading: boolean = false;
  searchFilter?: string = '';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;

  // Filter
  statusOptions = [
    { label: 'Pending', value: ContactUs_StatusContactUs_Status.Pending },
    { label: 'Responded', value: ContactUs_StatusContactUs_Status.Responded },
  ];

  selectedStatuses: (string | null)[] = [];
  selectedFilterStatuses: string[] = [];
  appliedFilterStatuses: string[] = [];
  displayFilter = false;

  constructor(private messageService: MessageService, private ContactService: ContactUsService) { }

  loadContactList() {
    this.loading = true;
    
    const statusFilter = this.appliedFilterStatuses && this.appliedFilterStatuses.length > 0
      ? this.appliedFilterStatuses
      : undefined;

    this.ContactService.contactList(this.currentPage, this.pageSize, this.searchFilter).subscribe({
      next: (res: any) => {
        console.log(res);

        this.statistics = res.statistics;
        this.contactList = res.requests.data;
        this.totalRecords = res.requests.totalRecords;
        this.currentPage = res.requests.currentPage;

        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching Contact list:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch Contact list'
        });
        this.loading = false;
      }
    })
  }

  applyGlobalFilter() {
    this.currentPage = 1;
    this.loadContactList();
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

    this.loadContactList();
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

  // Toggle status in filter
  toggleFilterStatus(status: string) {
    const index = this.selectedFilterStatuses.indexOf(status);
    if (index > -1) {
      this.selectedFilterStatuses.splice(index, 1);
    } else {
      this.selectedFilterStatuses.push(status);
    }
  }

  // Check if status is selected
  isStatusSelected(status: string): boolean {
    return this.selectedFilterStatuses.includes(status);
  }

  applyFilter() {
    this.appliedFilterStatuses = [...this.selectedFilterStatuses];

    this.currentPage = 1;
    this.loadContactList();
    this.displayFilter = false;
  }

  openFilterDialog() {
    this.selectedFilterStatuses = [...this.appliedFilterStatuses];
    this.displayFilter = true;
  }

  resetFilter() {
    this.selectedFilterStatuses = [];
    this.appliedFilterStatuses = [];
    this.currentPage = 1;
    this.loadContactList();
  }

}
