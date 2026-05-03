import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-support-tickets-details',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbModule,
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

}
