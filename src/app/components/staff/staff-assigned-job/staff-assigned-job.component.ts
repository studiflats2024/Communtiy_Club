import { Component, ViewChild } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpClientModule } from '@angular/common/http';
import { WorkerService } from '../../../services/worker.service';
import { ActivatedRoute, RouterModule } from '@angular/router';


import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';

import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { ChangeDetectionStrategy } from '@angular/core';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-staff-assigned-job',
  standalone: true,
  imports: [ DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule,RouterModule,InputTextareaModule,InputTextModule,DialogModule,CommonModule,ChipModule,ButtonModule,CardModule,FormsModule,NgClass,BreadcrumbModule],

  templateUrl: './staff-assigned-job.component.html',
  styleUrl: './staff-assigned-job.component.css',
  providers: [MessageService],

})
export class StaffAssignedJobComponent {
  items:any;
  itemsLink:any;
  skills = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6', 'Skill 7'];
  workerId:any;
  jobs:any;


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

  constructor( private router: Router,private messageService: MessageService,private workerService: WorkerService,private route: ActivatedRoute) {}

  ngOnInit() {

    this.items = [
      {
        label: 'View Details',
        icon: 'pi pi-eye',
        command: () =>  {

            this.viewDetails(this.selectedWorkerId);

        }
      },

    ];

    this.jobs = [
      {
        issueId: 'ISS-001',
        representative: {
          name: 'John Doe',
          image: 'ivanmagalhaes.png', // Replace with the actual image file name
        },
        aprt_No: 'Apt-102',
        issue: 'Leaking faucet in the kitchen',
        date_report: '2024-10-23',
        status: 'InReview',
      },
      {
        issueId: 'ISS-002',
        representative: {
          name: 'Jane Smith',
          image: 'asiyajavayant.png', // Replace with the actual image file name
        },
        aprt_No: 'Apt-203',
        issue: 'Broken window in the living room',
        date_report: '2024-10-22',
        status: 'Rejected',
      },
      {
        issueId: 'ISS-003',
        representative: {
          name: 'Mark Wilson',
          image: 'asiyajavayant.png', // Replace with the actual image file name
        },
        aprt_No: 'Apt-305',
        issue: 'No electricity in the bedroom',
        date_report: '2024-10-20',
        status: 'Accepted',
      },
      {
        issueId: 'ISS-004',
        representative: {
          name: 'Lisa Brown',
          image: 'amyelsner.png', // Replace with the actual image file name
        },
        aprt_No: 'Apt-401',
        issue: 'Heating system malfunction',
        date_report: '2024-10-19',
        status: 'Accepted',
      },
    ];



  //  this.getWorkers();

    // setTimeout(() => {
    //   this.loading = false;
    // }, 1000);


   // workers array of objects

// workers array of objects with representative data


// this.filterWorkersByStatus();

    // this.workerId = this.route.snapshot.paramMap.get('id');
    // console.log(this.workerId)

  this.skills = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6', 'Skill 7'];


    this.itemsLink = [
      { label: 'Staff List', routerLink: '/staff-list' },
      { label: 'Staff jobs', routerLink: '/staff-jobs' }
    ];
    // this.workerDetails();
    this.profileData = {
      is_Available: true, // or false
      image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ivanmagalhaes.png', // Replace with the actual path or leave it as a default image path
      name: 'John Doe',
      // type: 'Freelancer', // Worker type, e.g., 'Company', 'Freelancer', etc.
      email: 'john.doe@example.com',
      doB: '1985-06-15', // Date of birth
      address: '1234 Elm Street, Springfield, IL',
      whatsapp_No: '+1234567890',
      skills: ['JavaScript', 'Angular', 'Node.js'], // Array of skills
      total_Jobs: '56', // Any additional skills
      attachments: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/amazing-stone-path-in-forest-free-image.jpg?w=600&quality=80', // Path to the document, replace with the correct path
      type: 'company', // Use 'company' if you want to show the document section
      company_Name:'StudiFlats'
    };
  }
  profileData:any;
  workerDetails(){
    this.workerService.getProfile(this.workerId).subscribe(
      (data) => {
        this.profileData = data;
        console.log('Profile Data:', this.profileData);
      },
      (error) => {
        console.error('Error fetching profile data', error);
      }
    );
  }
  ///modals
  visible: boolean = false;

  showDialog() {
      this.visibleReject = true;
  }
  visibleSuccess:boolean =false;
  showDialog2(){
   if(this.isDeactivate===false){
    this.onUpdateProfileStatus(this.workerId,'Accept',this.reason)

   }else{
    this.onUpdateProfileStatus(this.workerId,'Deactivate',this.reason)

   }



  }

  isDeactivate:boolean=false;
  visibleSuccessR:boolean=false;
  visibleSuccessD:boolean=false;

  onUpdateProfileStatus(workerId:any,status:any,reason:any) {


    this.workerService.updateProfileStatus(workerId, status, reason).subscribe(
      (response) => {
        console.log('Status updated successfully:', response);
        if(status==='Accept'){
          this.visibleSuccess=true;
          this.isDeactivate=true;
       }else if(status==='Reject'){
          this.visibleReject=false;
          this.visibleSuccessR=true;
        this.isDeactivate=false;

       }else if(status==='Deactivate'){
        this.isDeactivate=false;
        this.visibleSuccessD=true;

       }
      },
      (error) => {
        console.error('Error updating status:', error);
      }
    );
  }

  visibleReject:boolean=false;
  reason:string='';
  // onSendAccept(){
  //   this.onUpdateProfileStatus(this.workerId,'Accept',this.reason)

  //   this.visibleSuccess=true;

  // }
  onSendReject(){
    this.onUpdateProfileStatus(this.workerId,'Reject',this.reason)
    // this.visibleReject=false;
  }




  //////////////////////////////////table here//////////////////////////////
   //////////////////////////////////table here//////////////////////////////
   selectedWorkerId:any;
   selectWorker(workerId:any) {
     this.selectedWorkerId = workerId;
     console.log(this.selectedWorkerId)
   }


   getWorkers() {
     this.workerService.getAllWorkerRequests(1, 20000, '').subscribe(
       (response) => {
         console.log('Data received:', response);
         this.workers = response; // Adjust this according to the response structure
         this.workers = response.data.map((worker: any) => ({
           id: worker.request_ID,
           requestNo: worker.request_ID,
           name: worker.worker_Name,
           email: worker.worker_Mail,
           type: worker.worker_Type,
           phone: worker.worker_Phone,
           skills: worker.worker_Skills.join(', '),
           status: worker.worker_Profile_Status,
         }));

         this.filterWorkersByStatus();
       },
       (error) => {
         console.error('Error fetching worker data:', error);
       }
     );
   }

   statusView:string='';
   onUpdateProfileStatusTable(workerId:any,status:any,reason:any) {
     const profile_ID = this.selectedWorkerId;
     const profile_Action = 'Accept';
     const additional_Data = '';


     const worker = this.workers.find(w => w.id === workerId);
       if (worker) {
           if(status==='Accept'){

        worker.status = 'Accepted';
     }else {

       worker.status = 'Rejected';
     }

       }

     this.workerService.updateProfileStatus(workerId, status, reason).subscribe(
       (response) => {
         console.log('Status updated successfully:', response);
       },
       (error) => {
         console.error('Error updating status:', error);
       }
     );
   }

   visibleRejectTable:boolean=false;
   reasonTable:string='';
   onSelectReject(){
     this.visibleRejectTable=true;

   }
   onSendRejectTable(){
     this.onUpdateProfileStatusTable(this.selectedWorkerId,'Reject',this.reasonTable)
     this.visibleRejectTable=false;
   }

 acceptedWorkers:any;
 rejectedWorkers:any;
 pendingWorkers:any;
   filterWorkersByStatus() {
     this.acceptedWorkers = this.workers.filter((worker) => worker.status === 'Accepted');
     this.rejectedWorkers = this.workers.filter((worker) => worker.status === 'Rejected');
     this.pendingWorkers = this.workers.filter((worker) => worker.status === 'InReview');
     // this.filteredWorkers = [...this.workers];
     console.log(this.workers)
     console.log(this.acceptedWorkers)
     console.log(this.rejectedWorkers)
     console.log(this.pendingWorkers)

   }

   getSeverity(status: string): 'info' | 'success' | 'warning' | 'danger' | 'secondary' | 'contrast' {
     switch (status) {
       case 'InReview':
         return 'info';
         case 'Rejected':
           return 'danger';
       case 'Accepted':
         return 'success';

       case 'NotCompleted':
         return 'danger';
       default:
         return 'secondary';
     }
   }

   onFilter(event: Event) {
     const inputValue = (event.target as HTMLInputElement).value;
     this.dt2.filterGlobal(inputValue, 'contains');
   }

   onRowSelect(event: any) {
     console.log(event)
     const staffId = event.data.id;
     console.log('id',staffId)
     this.router.navigate(['/staff-details', staffId]);
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

   deactivateWorker() {
     this.messageService.add({ severity: 'warn', summary: 'Deactivated', detail: 'Worker has been deactivated' });
   }
}
