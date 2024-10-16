import { Component, ViewChild } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests-list',
  standalone: true,
  imports: [FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],
  templateUrl: './requests-list.component.html',
  styleUrl: './requests-list.component.css'
})
export class RequestsListComponent {
  @ViewChild('dt2') dt2!: Table;
  workers!: any[];
  loading: boolean = false;
  value:any;
  selectedCustomer: any;

  representatives = [
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' }
  ];

  statuses = [
    { label: 'pending', value: 'pending' },
    { label: 'accepted', value: 'accepted' },
    { label: 'rejected', value: 'rejected' },

  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Mock customer data
    this.workers = [
      {
        id: 1,
        requestNo:'00211',
        name: 'James Smith',
        email: "alaa@gmail.com",
        type:"Company",
        phone:'011111111',
        skills:'Plumbing, Paint & Coloring',
        status: 'pending',

      },
      {
        id: 2,
        requestNo:'00233',
        name: 'Michael Johnson',
        email: "MichaelJohnson@gmail.com",
        type:"Individual",
        phone:'0117237927',
        skills:'Plumbing, Paint & Coloring',
        status: 'rejected',
      },
      {
        id: 3,
        requestNo:'00255',
        name: 'Linda Williams',
        email: "LindaWilliams@gmail.com",
        type:"Individual",
        phone:'01127862367',
        skills:'Plumbing, Paint & Coloring',
        status: 'accepted',
      },
      {
        id: 3,
        requestNo:'00221',
        name: 'David Miller',
        email: "DavidMiller@gmail.com",
        type:"Company",
        phone:'011273333',
        skills:'Plumbing, Paint & Coloring',
        status: 'accepted',
      },
      {
        id: 4,
        requestNo:'00200',
        name: 'David Miller',
        email: "DavidMiller@gmail.com",
        type:"Company",
        phone:'011273333',
        skills:'Plumbing, Paint & Coloring',
        status: 'rejected',
      }
    ];


    // setTimeout(() => {
    //   this.loading = false;
    // }, 1000);
  }

  getSeverity(status: string): 'info' | 'success' | 'warning' | 'danger' | 'secondary' | 'contrast' {
    switch (status) {
      case 'pending':
        return 'info';
      case 'accepted':
        return 'success';
      // case 'pending':
      //   return 'warning';
      case 'rejected':
        return 'danger';
      default:
        return 'secondary'; // If none of the cases match, return 'secondary'
    }
  }

  onFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.dt2.filterGlobal(inputValue, 'contains');
  }

  onRowSelect(event: any) {
    console.log(event)
    const workerId = event.data.id;
    console.log('id',workerId)
    this.router.navigate(['/worker-details', workerId]);
  }

}
