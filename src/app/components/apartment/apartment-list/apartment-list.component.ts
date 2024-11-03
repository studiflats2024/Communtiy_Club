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
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IssuesService } from '../../../services/issues.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { Menu } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apartment-list',
  standalone: true,
  imports: [ CommonModule,DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],

  templateUrl: './apartment-list.component.html',
  styleUrl: './apartment-list.component.css',
  providers: [MessageService],
})
export class ApartmentListComponent {
  @ViewChild('dt2') dt2!: Table;
  apartments: any[] = [];
  loading: boolean = false;
  value:any;

  items!: any;


  constructor(private route: ActivatedRoute,private issuesService: IssuesService,private router: Router,private messageService: MessageService) {
    this.route.queryParams.subscribe((params) => {
      if (params['selectMode'] === 'choose-apartment') {
        this.selectMode = true;
        console.log(this.selectMode)
      }
    });
  }

  selectMode:boolean=false;
  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      if (params['selectMode'] === 'choose') {
        this.selectMode = true;
        console.log(this.selectMode)
      }
    });

    this.items = [
      {
        label: 'View Details',
        icon: 'pi pi-eye',
        command: () =>  {

            // this.viewDetails(this.selectedWorkerId);

        }
      },
      {
        label: 'Accept Worker',
        icon: 'pi pi-check',
        // command: () => this.onUpdateProfileStatus(this.selectedWorkerId,'Accept','')
      },
      {
        label: 'Reject Worker',
        icon: 'pi pi-times',
        command: () => this.onSelectReject()
      },

    ];


   this.getApartments();

    // setTimeout(() => {
    //   this.loading = false;
    // }, 1000);
  }

  selectedApartment:any
  assignApartment(apartment:any) {
    if (this.selectedApartment) {
      // Handle the assignment, e.g., navigate back or update the issue with the selected staff ID
      this.selectedApartment =apartment ;
      console.log('Selected Apartment:', this.selectedApartment);
      this.router.navigate(['/create-issue'], {
        state: { selectedApartment: this.selectedApartment }
      });
    }
  }

  selectedAprtId:any;
  selectApartment(workerId:any) {
    this.selectedAprtId = workerId;
    console.log(this.selectedAprtId)
  }


  getApartments() {
    this.issuesService.getAllApartments(1, 20000, '').subscribe(
      (response) => {
        console.log('Data received:', response);
        // this.apartments = response.data;
        this.apartments= response.data.map((apartment: any) => ({
          apartment_ID: apartment.apartment_ID,
          apartment_Code:apartment.apartment_Code,
          apartment_Name: apartment.apartment_Name,
          apartment_Thumb_Image: apartment.apartment_Thumb_Image,
          apartment_Address: apartment.apartment_Address,
          apartment_No: apartment.apartment_No,
          apartment_Door_No: apartment.apartment_Door_No,

        }));

        // this.filterWorkersByStatus();
      },
      (error) => {
        console.error('Error fetching worker data:', error);
      }
    );
  }

  statusView:string='';
  onUpdateProfileStatus(workerId:any,status:any,reason:any) {
    const profile_ID = this.selectedAprtId;
    const profile_Action = 'Accept';
    const additional_Data = '';


    const apartment = this.apartments.find(a => a.apartment_ID === workerId);
    //   if (worker) {
    //       if(status==='Accept'){

    //    worker.status = 'Accepted';
    // }else {

    //   worker.status = 'Rejected';
    // }

    //   }

    // this.workerService.updateProfileStatus(workerId, status, reason).subscribe(
    //   (response) => {
    //     console.log('Status updated successfully:', response);
    //   },
    //   (error) => {
    //     console.error('Error updating status:', error);
    //   }
    // );
  }

  visibleReject:boolean=false;
  reason:string='';
  onSelectReject(){
    this.visibleReject=true;

  }
  onSendReject(){
    this.onUpdateProfileStatus(this.selectedAprtId,'Reject',this.reason)
    this.visibleReject=false;
  }

acceptedWorkers:any[]=[];
rejectedWorkers:any[]=[];
pendingWorkers:any[]=[];
  filterWorkersByStatus() {
    // this.acceptedWorkers = this.workers.filter((worker) => worker.status === 'Accepted');
    // this.rejectedWorkers = this.workers.filter((worker) => worker.status === 'Rejected');
    // this.pendingWorkers = this.workers.filter((worker) => worker.status === 'InReview');

    // console.log(this.workers)
    // console.log(this.acceptedWorkers)
    // console.log(this.rejectedWorkers)
    // console.log(this.pendingWorkers)

  }



  onFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log(inputValue)
    this.dt2.filterGlobal(inputValue, 'contains');
    console.log(this.dt2);
    // console.log(this.dt2.filterGlobal(inputValue, 'contains'))
  }

  onRowSelect(event: any) {
    console.log(event)
    const workerId = event.data.id;
    console.log('id',workerId)
    // this.router.navigate(['/worker-details', workerId]);
  }

  viewDetails(workerId: any) {
    this.router.navigate(['/worker-details', workerId]);

  }

  acceptWorker() {
    this.messageService.add({ severity: 'success', summary: 'Accepted', detail: 'Worker has been accepted' });
  }

  rejectWorker() {
    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Worker has been rejected' });
  }
}
