import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
// import { CardTableComponent } from '../card-table/card-table.component';
import { Table, TableModule } from 'primeng/table';
import { AppointmentItem, AppointmentService, AppointmentStatCard, AppointmentStatus, BulkCancelAppointmentsRequest, CompleteAppointmentRequest } from '../../services/appointment.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-appointments-list',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    ButtonModule,
    ToastModule,
    BreadcrumbModule,
    InputTextModule,
    // CardTableComponent,
    TableModule,
    CheckboxModule,
    DropdownModule,
    OverlayPanelModule,
  ],
  templateUrl: './appointments-list.component.html',
  styleUrl: './appointments-list.component.css',
  providers: [MessageService]
})
export class AppointmentsListComponent {
  @ViewChild('dt') table!: Table;
  @ViewChild('selectAllCheckbox') selectAllCheckbox: any;

  // Breadcrumb
  items = [
    { label: 'Dashboard', routerLink: '/dashboard' },
    { label: 'Appointments Bookings', routerLink: '/appointment-list' }
  ];

  // Statistics - Filter out "Upcoming" card
  statCards: AppointmentStatCard[] = [];
  filteredStatCards: AppointmentStatCard[] = [];

  // Date filter - No default values (will use API defaults)
  selectedStartDate: string = '';
  selectedEndDate: string = '';
  showDateDialog = false;
  displayedRange: string = '';
  displayFilter = false;

  // Filter dates for Statistics (generalDateFrom/To)
  generalDateFrom: string | undefined;
  generalDateTo: string | undefined;

  // Filter dates for List (listDateFrom/To)
  listDateFrom: string | undefined;
  listDateTo: string | undefined;

  // Table data
  appointments: AppointmentItem[] = [];
  loading: boolean = false;
  globalFilter: string = '';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;

  // Filter
  statusOptions = [
    { label: 'Upcoming', value: AppointmentStatus.Upcoming },
    { label: 'Completed', value: AppointmentStatus.Completed },
    { label: 'Cancelled', value: AppointmentStatus.Cancelled },
    { label: 'Converted', value: AppointmentStatus.Converted }
  ];
  selectedStatuses: (string | null)[] = [];

  // ✨ MODIFIED: Array to hold multiple selected statuses
  selectedFilterStatuses: string[] = [];
  appliedFilterStatuses: string[] = [];

  // Filter dialog date picker
  filterStartDate: string = '';
  filterEndDate: string = '';

  // Modals
  showCancelModal = false;
  showCompleteModal = false;
  showCancelReasonModal = false;
  showResultModal = false;
  currentAppointment: AppointmentItem | null = null;
  selectedAppointment: AppointmentItem | null = null;

  // Selection for bulk operations
  selectedAppointments: AppointmentItem[] = [];
  selectAllChecked: boolean = false;

  // Cancel form
  cancellationReasons = [
    { label: "didn't attend", value: "didn't attend" },
    { label: 'Canceled before appointment', value: 'Canceled before appointment' }
  ];
  selectedCancellationReason: string = '';
  cancellationNotes: string = '';

  // Complete form
  completionResults = [
    { label: 'Joined the community', value: 'Joined the community' },
    { label: 'Not Joined', value: 'Not Joined' }
  ];
  selectedCompletionResult: string = '';
  completionNotes: string = '';

  // Status enum for template
  AppointmentStatus = AppointmentStatus;

  constructor(
    private appointmentService: AppointmentService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadStatistics();
    this.loadAppointments();
  }

  // ==================== Statistics ====================
  loadStatistics() {
    // Use generalDateFrom and generalDateTo (no defaults)
    const fromDate = this.selectedStartDate
      ? this.toUtcIsoStartOfDay(this.selectedStartDate)
      : undefined;

    const toDate = this.selectedEndDate
      ? this.toUtcIsoEndOfDay(this.selectedEndDate)
      : undefined;

    this.appointmentService.getStatistics(fromDate, toDate).subscribe({
      next: (res: any) => {
        if (res.succeeded && res.data) {
          this.statCards = res.data.statCards.map((item: any): AppointmentStatCard => ({
            title: item.title,
            count: item.count,
            changePercentage: item.changePercentage,
            isIncreasing: item.isIncreasing,
            lastUpdatedAt: item.lastUpdatedAt,
            lastUpdatedLabel: item.lastUpdatedLabel
          }));

          // Filter out "Upcoming" card from display
          this.filteredStatCards = this.statCards.filter(card => card.title !== 'Upcoming');
        }
      },
      error: (err: any) => {
        console.error('Failed to load statistics:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load statistics',
          life: 3000
        });
      }
    });
  }

  getIcon(title: string): string {
    const icons: any = {
      'Total Bookings': 'calenderIcon.svg',
      'Completed': 'rightIcon.svg',
      'Cancelled': 'wrongIcon.svg',
      'Community Joining': 'Icon Container (3).svg'
    };
    return icons[title] || 'calenderIcon.svg';
  }

  // ==================== Load Appointments ====================
  loadAppointments() {
    this.loading = true;

    // Filter out null values and convert to array of strings
    // const statusFilter = this.selectedStatuses && this.selectedStatuses.length > 0
    //   ? this.selectedStatuses.filter((s: any) => s !== null && s !== undefined).map((s: any) => String(s))
    //   : undefined;

    // ✨ MODIFIED: Use appliedFilterStatuses instead of selectedStatuses
    const statusFilter = this.appliedFilterStatuses && this.appliedFilterStatuses.length > 0
      ? this.appliedFilterStatuses
      : undefined;

    // Prepare date filters for list
    const listDateFrom = this.listDateFrom;
    const listDateTo = this.listDateTo;
    const generalDateFrom = this.generalDateFrom;
    const generalDateTo = this.generalDateTo;

    this.appointmentService.getAppointmentsList(
      this.currentPage,
      this.pageSize,
      this.globalFilter?.trim() || undefined,
      statusFilter,
      listDateFrom,
      listDateTo,
      generalDateFrom,
      generalDateTo
    ).subscribe({
      next: (res: any) => {
        if (res.succeeded) {
          this.appointments = res.data || [];
          this.totalRecords = res.totalRecords || 0;
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Failed to load appointments:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load appointments',
          life: 3000
        });
        this.loading = false;
      }
    });
  }

  // ==================== Pagination ====================
  pageChange(event: any): void {
    this.currentPage = event.page + 1;
    this.pageSize = event.rows;
    this.loadAppointments();
  }

  // ==================== Filter ====================
  // applyFilter() {
  //   // Update status filters - filter out null values and convert to array of strings
  //   const statusFilter = this.selectedStatuses && this.selectedStatuses.length > 0
  //     ? this.selectedStatuses.filter((s: any) => s !== null && s !== undefined).map((s: any) => String(s))
  //     : undefined;

  //   // Update date filters if date range is selected in filter dialog
  //   if (this.filterStartDate && this.filterEndDate) {
  //     this.listDateFrom = this.toUtcIsoStartOfDay(this.filterStartDate);
  //     this.listDateTo = this.toUtcIsoEndOfDay(this.filterEndDate);
  //   } else {
  //     // Clear date filters if not set
  //     this.listDateFrom = undefined;
  //     this.listDateTo = undefined;
  //   }

  //   this.currentPage = 1;
  //   this.loadAppointments();
  //   this.displayFilter = false;
  // }

  // openFilterDialog() {
  //   // Reset filter dates when opening dialog
  //   this.filterStartDate = this.listDateFrom ? this.fromUtcIsoToYmd(this.listDateFrom) : '';
  //   this.filterEndDate = this.listDateTo ? this.fromUtcIsoToYmd(this.listDateTo) : '';
  //   this.displayFilter = true;
  // }

  // resetFilter() {
  //   this.selectedStatuses = [];
  //   this.filterStartDate = '';
  //   this.filterEndDate = '';
  //   this.listDateFrom = undefined;
  //   this.listDateTo = undefined;
  //   this.currentPage = 1;
  //   this.loadAppointments();
  // }

  get isFilterDateRangeInvalid(): boolean {
    if (!this.filterStartDate || !this.filterEndDate) return false;
    return new Date(this.filterEndDate) < new Date(this.filterStartDate);
  }

  private fromUtcIsoToYmd(isoString: string): string {
    const date = new Date(isoString);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  cancelationReasonFromWebsite: any;
  // ==================== Modal Controls ====================
  openCancelReasonModal(appointment: AppointmentItem) {
    this.cancelationReasonFromWebsite = appointment.cancellation_Reason;
    this.selectedAppointment = appointment;
    this.showCancelReasonModal = true;
  }

  openResultModal(appointment: AppointmentItem) {
    this.selectedAppointment = appointment;
    this.showResultModal = true;
  }

  openCancelModal(appointment: AppointmentItem) {
    this.currentAppointment = appointment;
    this.resetCancelForm();
    this.showCancelModal = true;
  }

  openCompleteModal(appointment: AppointmentItem) {
    this.currentAppointment = appointment;
    this.resetCompleteForm();
    this.showCompleteModal = true;
  }

  closeAllModals() {
    this.showCancelReasonModal = false;
    this.showResultModal = false;
    this.showCancelModal = false;
    this.showCompleteModal = false;
    this.selectedAppointment = null;
    this.currentAppointment = null;
  }

  // ==================== Cancel Appointment ====================
  resetCancelForm() {
    this.selectedCancellationReason = '';
    this.cancellationNotes = '';
  }

  get canConfirmCancel(): boolean {
    return this.selectedCancellationReason !== '';
  }

  confirmCancel() {
    if (!this.canConfirmCancel || !this.currentAppointment) return;

    const request: BulkCancelAppointmentsRequest = {
      appointmentIds: [this.currentAppointment.id],
      cancellationReason: this.selectedCancellationReason,
      additionalNotes: this.cancellationNotes || undefined
    };

    this.appointmentService.bulkCancelAppointments(request).subscribe({
      next: (res: any) => {
        if (res.succeeded) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Appointment cancelled successfully',
            life: 3000
          });

          this.closeCancelModal();
          setTimeout(() => {
            this.loadStatistics();
            this.loadAppointments();
          }, 1000);
        }
      },
      error: (err: any) => {
        console.error('Failed to cancel appointment:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Failed to cancel appointment',
          life: 3000
        });
      }
    });
  }

  // ==================== Bulk Selection ====================
  isSelected(appointment: AppointmentItem): boolean {
    return this.selectedAppointments.some(selected => selected.id === appointment.id);
  }

  isAllSelected(): boolean {
    return this.appointments.length > 0 && this.selectedAppointments.length === this.appointments.length;
  }

  isIndeterminate(): boolean {
    return this.selectedAppointments.length > 0 && this.selectedAppointments.length < this.appointments.length;
  }

  toggleSelectAll() {
    if (this.isAllSelected()) {
      this.selectedAppointments = [];
    } else {
      this.selectedAppointments = [...this.appointments];
    }
    this.updateIndeterminateState();
  }

  toggleSelection(appointment: AppointmentItem) {
    const index = this.selectedAppointments.findIndex(selected => selected.id === appointment.id);
    if (index > -1) {
      this.selectedAppointments.splice(index, 1);
    } else {
      this.selectedAppointments.push(appointment);
    }
    this.updateIndeterminateState();
  }

  updateIndeterminateState() {
    // Use setTimeout to ensure the view is updated after change detection
    setTimeout(() => {
      if (this.selectAllCheckbox && this.selectAllCheckbox.inputViewChild) {
        try {
          const checkboxInput = this.selectAllCheckbox.inputViewChild.nativeElement as HTMLInputElement;
          if (checkboxInput && typeof checkboxInput.indeterminate !== 'undefined') {
            checkboxInput.indeterminate = this.isIndeterminate();
          }
        } catch (error) {
          // Silently handle errors - checkbox will still work without indeterminate state
          console.debug('Could not update indeterminate state:', error);
        }
      }
    }, 10);
  }

  // ==================== Bulk Cancel ====================
  openBulkCancelModal() {
    if (this.selectedAppointments.length === 0) return;
    this.resetCancelForm();
    this.showCancelModal = true;
    this.currentAppointment = null; // Clear single appointment selection
  }

  confirmBulkCancel() {
    if (!this.canConfirmCancel || this.selectedAppointments.length === 0) return;

    // Only cancel appointments with Upcoming status
    const upcomingAppointments = this.selectedAppointments.filter(
      apt => apt.status === AppointmentStatus.Upcoming
    );

    if (upcomingAppointments.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'No upcoming appointments selected. Only upcoming appointments can be cancelled.',
        life: 3000
      });
      return;
    }

    const request: BulkCancelAppointmentsRequest = {
      appointmentIds: upcomingAppointments.map(apt => apt.id),
      cancellationReason: this.selectedCancellationReason,
      additionalNotes: this.cancellationNotes || undefined
    };

    this.appointmentService.bulkCancelAppointments(request).subscribe({
      next: (res: any) => {
        if (res.succeeded) {
          const successCount = res.data?.successCount || 0;
          const failedCount = res.data?.failedCount || 0;

          let detailMessage = `Successfully cancelled ${successCount} appointment(s).`;
          if (failedCount > 0) {
            detailMessage += ` ${failedCount} appointment(s) could not be cancelled.`;
          }

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: detailMessage,
            life: 3000
          });

          // Clear selection
          this.selectedAppointments = [];
          this.closeCancelModal();

          setTimeout(() => {
            this.loadStatistics();
            this.loadAppointments();
          }, 1000);
        }
      },
      error: (err: any) => {
        console.error('Failed to cancel appointments:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Failed to cancel appointments',
          life: 3000
        });
      }
    });
  }

  clearSelection() {
    this.selectedAppointments = [];
    this.selectAllChecked = false;
    // Update indeterminate state after clearing selection
    setTimeout(() => this.updateIndeterminateState(), 10);
  }

  closeCancelModal() {
    this.showCancelModal = false;
    this.currentAppointment = null;
    this.resetCancelForm();
  }

  // ==================== Complete Appointment ====================
  resetCompleteForm() {
    this.selectedCompletionResult = '';
    this.completionNotes = '';
  }

  get canConfirmComplete(): boolean {
    return this.selectedCompletionResult !== '';
  }

  confirmComplete() {
    if (!this.canConfirmComplete || !this.currentAppointment) return;

    const request: CompleteAppointmentRequest = {
      appointmentId: this.currentAppointment.id,
      resultOfAppointment: this.selectedCompletionResult,
      additionalNotes: this.completionNotes || undefined
    };

    this.appointmentService.completeAppointment(request).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Appointment marked as completed successfully',
          life: 3000
        });

        this.closeCompleteModal();
        setTimeout(() => {
          this.loadStatistics();
          this.loadAppointments();
        }, 1000);
      },
      error: (err: any) => {
        console.error('Failed to complete appointment:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Failed to complete appointment',
          life: 3000
        });
      }
    });
  }

  closeCompleteModal() {
    this.showCompleteModal = false;
    this.currentAppointment = null;
    this.resetCompleteForm();
  }

  // ==================== Status Styling ====================
  getStatusClass(status: AppointmentStatus): string {
    const classes: any = {
      [AppointmentStatus.Upcoming]: 'badge-upcoming',
      [AppointmentStatus.Completed]: 'badge-completed',
      [AppointmentStatus.Cancelled]: 'badge-cancelled',
      [AppointmentStatus.Converted]: 'badge-converted'
    };
    return classes[status] || 'badge-default';
  }

  // ==================== Date Helpers ====================
  formatDateTime(dateTimeString: string): string {
    // API returns formatted string like "Jan 21, 2026 . 11:00 AM"
    // Return as-is if already formatted, otherwise format it
    if (!dateTimeString) return '';

    // Check if it's already formatted (contains ".")
    if (dateTimeString.includes('.')) {
      return dateTimeString;
    }

    // Otherwise, format it
    try {
      const date = new Date(dateTimeString);
      if (isNaN(date.getTime())) {
        return dateTimeString; // Return original if invalid date
      }
      return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateTimeString; // Return original on error
    }
  }

  openDateDialog() {
    this.showDateDialog = true;
  }

  openDatePicker(input: HTMLInputElement) {
    if ('showPicker' in input) {
      input.showPicker();
    }
  }

  applyDateRange() {
    if (this.rangeInvalid || !this.selectedStartDate || !this.selectedEndDate) return;
    this.updateDisplayedRange();

    // Update both general dates (for statistics) and list dates (for table)
    this.generalDateFrom = this.toUtcIsoStartOfDay(this.selectedStartDate);
    this.generalDateTo = this.toUtcIsoEndOfDay(this.selectedEndDate);
    this.listDateFrom = this.generalDateFrom;
    this.listDateTo = this.generalDateTo;

    this.showDateDialog = false;
    this.loadStatistics();
    this.loadAppointments();
  }

  get rangeInvalid(): boolean {
    if (!this.selectedStartDate || !this.selectedEndDate) return false;
    return new Date(this.selectedEndDate) < new Date(this.selectedStartDate);
  }

  preset(kind: 'today' | 'last7' | 'month') {
    const today = new Date();

    if (kind === 'today') {
      this.selectedStartDate = this.toYmd(today);
      this.selectedEndDate = this.toYmd(today);
    } else if (kind === 'last7') {
      this.selectedStartDate = this.toYmd(this.addDays(today, -7));
      this.selectedEndDate = this.toYmd(today);
    } else {
      const first = new Date(today.getFullYear(), today.getMonth(), 1);
      this.selectedStartDate = this.toYmd(first);
      this.selectedEndDate = this.toYmd(today);
    }

    this.updateDisplayedRange();
  }

  clearRange() {
    this.selectedStartDate = '';
    this.selectedEndDate = '';
    this.displayedRange = '';
    this.generalDateFrom = undefined;
    this.generalDateTo = undefined;
    this.listDateFrom = undefined;
    this.listDateTo = undefined;
    this.loadStatistics();
    this.loadAppointments();
  }

  private updateDisplayedRange() {
    if (!this.selectedStartDate || !this.selectedEndDate) {
      this.displayedRange = '';
      return;
    }
    this.displayedRange = `${this.toDdMmYyyy(this.selectedStartDate)} → ${this.toDdMmYyyy(this.selectedEndDate)}`;
  }

  private toDdMmYyyy(ymd: string): string {
    const d = new Date(ymd);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
  }

  private toYmd(d: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  private addDays(d: Date, days: number): Date {
    const x = new Date(d);
    x.setDate(x.getDate() + days);
    return x;
  }

  private toUtcIsoStartOfDay(ymd: string): string {
    const [y, m, d] = ymd.split('-').map(Number);
    const utc = new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
    return utc.toISOString().replace(/\.\d+(?=Z$)/, '');
  }

  private toUtcIsoEndOfDay(ymd: string): string {
    const [y, m, d] = ymd.split('-').map(Number);
    const utc = new Date(Date.UTC(y, m - 1, d, 23, 59, 59));
    return utc.toISOString().replace(/\.\d+(?=Z$)/, '');
  }

  /////////////////////////////////////////////////////////////////////////

  // Sorting
  sortField: string = '';
  sortOrder: number = 0; // 1 = asc, -1 = desc

  // ==================== Sorting ====================
  onSort(event: any) {
    const field = event.field;
    const order = event.order; // 1 = ascending, -1 = descending

    this.appointments.sort((a: any, b: any) => {
      let value1 = a[field];
      let value2 = b[field];

      if (value1 == null) value1 = '';
      if (value2 == null) value2 = '';

      let result = 0;
      if (typeof value1 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      }

      return order * result;
    });
  }

  ////////////////////////////////////////////////////////////////////

  // ✨ NEW: Toggle status in filter
  toggleFilterStatus(status: string) {
    const index = this.selectedFilterStatuses.indexOf(status);
    if (index > -1) {
      this.selectedFilterStatuses.splice(index, 1);
    } else {
      this.selectedFilterStatuses.push(status);
    }
  }

  // ✨ NEW: Check if status is selected
  isStatusSelected(status: string): boolean {
    return this.selectedFilterStatuses.includes(status);
  }

  // ✨ MODIFIED: Apply filter with multiple statuses
  applyFilter() {
    // Copy selected statuses to applied statuses
    this.appliedFilterStatuses = [...this.selectedFilterStatuses];

    // Update date filters
    if (this.filterStartDate && this.filterEndDate) {
      this.listDateFrom = this.toUtcIsoStartOfDay(this.filterStartDate);
      this.listDateTo = this.toUtcIsoEndOfDay(this.filterEndDate);
    } else {
      this.listDateFrom = undefined;
      this.listDateTo = undefined;
    }

    this.currentPage = 1;
    this.loadAppointments();
    this.displayFilter = false;
  }

  // ✨ MODIFIED: Open filter dialog and sync selections
  openFilterDialog() {
    // Copy applied filters to selected filters
    this.selectedFilterStatuses = [...this.appliedFilterStatuses];

    this.filterStartDate = this.listDateFrom ? this.fromUtcIsoToYmd(this.listDateFrom) : '';
    this.filterEndDate = this.listDateTo ? this.fromUtcIsoToYmd(this.listDateTo) : '';
    this.displayFilter = true;
  }

  // ✨ MODIFIED: Reset filter
  resetFilter() {
    this.selectedFilterStatuses = [];
    this.appliedFilterStatuses = [];
    this.filterStartDate = '';
    this.filterEndDate = '';
    this.listDateFrom = undefined;
    this.listDateTo = undefined;
    this.currentPage = 1;
    this.loadAppointments();
  }

  // ✨ NEW: Clear all active filters
  clearAllFilters() {
    this.resetFilter();
  }

  // ✨ NEW: Get status color
  getStatusColor(status: string): string {
    const colors: any = {
      'Upcoming': '#1151B4',
      'Completed': '#157E48',
      'Cancelled': '#DC2626',
      'Converted': '#DFA314'
    };
    return colors[status] || '#6B7280';
  }


}
