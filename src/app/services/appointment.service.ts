
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private readonly apiUrl = 'https://devapi.studiflats.com/api/AppointmentBooking';

    constructor(private http: HttpClient) { }

    // Get statistics with date filter (GeneralDateFrom, GeneralDateTo – نفس أسماء الـ List)
    getStatistics(generalDateFrom?: string, generalDateTo?: string): Observable<AppointmentStatisticsResponse> {
        let params = new HttpParams();

        if (generalDateFrom) {
            params = params.set('GeneralDateFrom', generalDateFrom);
        }
        if (generalDateTo) {
            params = params.set('GeneralDateTo', generalDateTo);
        }

        return this.http.get<AppointmentStatisticsResponse>(`${this.apiUrl}/Statistics`, { params });
    }

    // Get paginated appointments list with all filters
    getAppointmentsList(
        pageNumber: number = 1,
        pageSize: number = 10,
        searchTerm?: string,
        statusFilter?: string[],
        listDateFrom?: string,
        listDateTo?: string,
        generalDateFrom?: string,
        generalDateTo?: string,
        AdminIdFilter?: string
    ): Observable<PaginatedAppointmentResponse> {
        let params = new HttpParams()
            .set('PageNumber', pageNumber.toString())
            .set('PageSize', pageSize.toString());

        if (searchTerm && searchTerm.trim()) {
            params = params.set('SearchTerm', searchTerm);
        }

        if (statusFilter && statusFilter.length > 0) {
            statusFilter.forEach(status => {
                params = params.append('StatusFilter', status);
            });
        }

        if (listDateFrom) {
            params = params.set('ListDateFrom', listDateFrom);
        }

        if (listDateTo) {
            params = params.set('ListDateTo', listDateTo);
        }

        if (generalDateFrom) {
            params = params.set('GeneralDateFrom', generalDateFrom);
        }

        if (generalDateTo) {
            params = params.set('GeneralDateTo', generalDateTo);
        }

        if (AdminIdFilter) {
            params = params.set('AdminIdFilter', AdminIdFilter);
        }

        return this.http.get<PaginatedAppointmentResponse>(`${this.apiUrl}/List`, { params });
    }

    // Complete appointment
    completeAppointment(request: CompleteAppointmentRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/Complete`, request);
    }

    // Bulk cancel appointments
    bulkCancelAppointments(request: BulkCancelAppointmentsRequest): Observable<BulkCancelResultResponse> {
        return this.http.post<BulkCancelResultResponse>(`${this.apiUrl}/BulkCancel`, request);
    }

    getDistinctAdmins(): Observable<AdminFilterListResponse> {
        return this.http.get<AdminFilterListResponse>(`${this.apiUrl}/DistinctAdmins`);
    }

}

// ==================== Interfaces ====================

export interface AppointmentStatisticsResponse {
    data: AppointmentStatistics;
    succeeded: boolean;
    errors: string[];
    message: string;
}

export interface AppointmentStatistics {
    statCards: AppointmentStatCard[];
}

export interface AppointmentStatCard {
    title: string;
    count: number;
    changePercentage: number;
    isIncreasing: boolean;
    lastUpdatedAt: string;
    lastUpdatedLabel: string;
}

export interface AppointmentItem {
    id: string;
    booking_Reference: string;
    tenant_Name: string;
    tenant_Email: string;
    phone_Number: string;
    whatsApp_Number: string;
    appointment_Date_Time: string;
    status: AppointmentStatus;
    cancellation_Reason?: string;
    result_Of_Appointment?: string;
    processed_By_Admin: string;
}

export enum AppointmentStatus {
    Upcoming = 'Upcoming',
    Completed = 'Completed',
    Cancelled = 'Cancelled',
    Converted = 'Converted'
}

export interface PaginatedAppointmentResponse {
    data: AppointmentItem[];
    succeeded: boolean;
    errors?: string[];
    message?: string;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
}

export interface CompleteAppointmentRequest {
    appointmentId: string;
    resultOfAppointment: string;
    additionalNotes?: string;
}

export interface BulkCancelAppointmentsRequest {
    appointmentIds: string[];
    cancellationReason: string;
    additionalNotes?: string;
}

export interface BulkCancelResultResponse {
    data: BulkCancelResult;
    succeeded: boolean;
    errors: string[];
    message: string;
}

export interface BulkCancelResult {
    totalRequested: number;
    successCount: number;
    failedCount: number;
    failedAppointments: FailedCancellationDto[];
}

export interface FailedCancellationDto {
    appointmentId: string;
    bookingReference: string;
    reason: string;
}

export interface AdminFilterListResponse {
    data: AdminFilter[];
    succeeded: boolean;
    errors: string[];
    message: string;
}

export interface AdminFilter {
    userId: string;
    fullName: string;
}