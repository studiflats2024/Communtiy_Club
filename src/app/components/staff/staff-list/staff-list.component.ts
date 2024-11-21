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
import { WorkerService } from '../../../services/worker.service';
import { StaffService } from '../../../services/staff.service';

import { ChangeDetectionStrategy } from '@angular/core';
import { Menu } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [ CommonModule,DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.css',
  providers: [MessageService],

})
export class StaffListComponent {
  @ViewChild('dt2') dt2!: Table;
  // workers!: any[];
  loading: boolean = false;
  value:any;

  items!: any;

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

  constructor(private route: ActivatedRoute,private staffService: StaffService,private router: Router,private messageService: MessageService) {
    this.route.queryParams.subscribe((params) => {
      if (params['selectMode'] === 'assign') {
        this.selectMode = true;
        console.log(this.selectMode)
      }
    });
  }
selectMode:boolean=false;
selectedStaffId:any;
staff:any[]=[]
  ngOnInit() {

    this.getStaffData()

    this.route.queryParams.subscribe((params) => {
      if (params['selectMode'] === 'assign') {
        this.selectMode = true;
        console.log(this.selectMode)
      }
    });

    this.items = [
      {
        label: 'View Details',
        icon: 'pi pi-eye',
        command: () =>  {

            this.viewDetails(this.selectedStaffId);

        }
      },
      {
        label: 'View Assigned Jobs',
        icon: 'pi pi-eye',
        command: () =>  {

            this.viewJobs(this.selectedStaffId);

        }
      },
      {
        label: 'Update Staff',
        icon: 'pi pi-pencil',
        command: () =>  {

            this.openUpdate(this.selectedStaffId);

        }
      },
      // {
      //   label: 'Accept Worker',
      //   icon: 'pi pi-check',
      //   command: () => this.onUpdateProfileStatus(this.selectedWorkerId,'Accept','')
      // },
      // {
      //   label: 'Reject Worker',
      //   icon: 'pi pi-times',
      //   command: () => this.onSelectReject()
      // },
      // {
      //   label: 'Deactivate Worker',
      //   icon: 'pi pi-ban',
      //   command: () => this.deactivateWorker()
      // }
    ];


  //  this.getWorkers();

    setTimeout(() => {
      this.loading = false;
    }, 1000);


   // workers array of objects


// this.staff = [
//   {
//     id: 1,
//     requestNo: 'REQ-001',
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     type: 'Full-Time',
//     phone: '123-456-7890',
//     skills: 'JavaScript, Angular, Node.js',
//     status: 'Active',
//     representative: {
//       name: 'Alice Representative',
//       image: 'amyelsner.png', // Replace with the actual image name if available
//     },
//   },
//   {
//     id: 2,
//     requestNo: 'REQ-002',
//     name: 'Jane Smith',
//     email: 'jane.smith@example.com',
//     type: 'Part-Time',
//     phone: '098-765-4321',
//     skills: 'Python, Django, Machine Learning',
//     status: 'Pending',
//     representative: {
//       name: 'Bob Representative',
//       image: 'asiyajavayant.png',
//     },
//   },
//   {
//     id: 3,
//     requestNo: 'REQ-003',
//     name: 'Alice Johnson',
//     email: 'alice.johnson@example.com',
//     type: 'Contract',
//     phone: '555-123-4567',
//     skills: 'Java, Spring Boot, Microservices',
//     status: 'InReview',
//     representative: {
//       name: 'Charlie Representative',
//       image: 'onyamalimba.png',
//     },
//   },
//   {
//     id: 4,
//     requestNo: 'REQ-004',
//     name: 'Bob Brown',
//     email: 'bob.brown@example.com',
//     type: 'Freelancer',
//     phone: '111-222-3333',
//     skills: 'UI/UX Design, Figma, Adobe XD',
//     status: 'Rejected',
//     representative: {
//       name: 'Diane Representative',
//       image: 'ivanmagalhaes.png',
//     },
//   },
//   {
//     id: 5,
//     requestNo: 'REQ-005',
//     name: 'Charlie Green',
//     email: 'charlie.green@example.com',
//     type: 'Full-Time',
//     phone: '444-555-6666',
//     skills: 'DevOps, AWS, Docker, Kubernetes',
//     status: 'Accepted',
//     representative: {
//       name: 'Emily Representative',
//       image: 'elwinsharvill.png',
//     },
//   },
// ];

// this.filterWorkersByStatus();




  }
  selectedStaff:any
  assignStaff(worker:any) {
    if (this.selectedStaff) {
      // Handle the assignment, e.g., navigate back or update the issue with the selected staff ID
      this.selectedStaff = worker;
      console.log('Selected Staff:', this.selectedStaff);
      this.router.navigate(['/issues-list'], {
        state: { selectedStaff: this.selectedStaff }
      });
    }
  }


  // selectedWorkerId:any;
  selectStaff(workerId:any) {
    this.selectedStaffId = workerId;
    console.log(this.selectedStaffId)
  }


  // getWorkers() {
  //   this.workerService.getAllWorkerRequests(1, 20000, '').subscribe(
  //     (response) => {
  //       console.log('Data received:', response);
  //       this.staff = response; // Adjust this according to the response structure
  //       this.staff= response.data.map((worker: any) => ({
  //         id: worker.request_ID,
  //         requestNo: worker.request_ID,
  //         name: worker.worker_Name,
  //         email: worker.worker_Mail,
  //         type: worker.worker_Type,
  //         phone: worker.worker_Phone,
  //         skills: worker.worker_Skills.join(', '),
  //         status: worker.worker_Profile_Status,
  //       }));

  //       this.filterWorkersByStatus();
  //     },
  //     (error) => {
  //       console.error('Error fetching worker data:', error);
  //     }
  //   );
  // }
  getStaffData(): void {
    const pageNo = 1; // Example page number
    const pageSize = 50000; // Example page size

    this.staffService.getAllStaff(pageNo, pageSize).subscribe(
      (data) => {
        console.log(data); // Logs the response
        this.staff = data.data.map((staff: any) => ({
          id: staff.id,
          name: staff.name,
          picture: staff.picture, // Assuming 'picture' is the image URL
          email: staff.email,
          dob: staff.dob,
          phoneNo: staff.phoneNo,
          address: staff.address,
          skills: staff.skills.join(', '), // Join skills into a single string
        }));
      },
      (error) => {
        console.error('Error fetching staff data', error);
      }
    );
  }



  statusView:string='';
  // onUpdateProfileStatus(workerId:any,status:any,reason:any) {
  //   const profile_ID = this.selectedStaffId;
  //   const profile_Action = 'Accept';
  //   const additional_Data = '';


  //   const worker = this.staff.find(w => w.id === workerId);
  //     if (worker) {
  //         if(status==='Accept'){

  //      worker.status = 'Accepted';
  //   }else {

  //     worker.status = 'Rejected';
  //   }

  //     }

  //   this.workerService.updateProfileStatus(workerId, status, reason).subscribe(
  //     (response) => {
  //       console.log('Status updated successfully:', response);
  //     },
  //     (error) => {
  //       console.error('Error updating status:', error);
  //     }
  //   );
  // }

  visibleReject:boolean=false;
  reason:string='';
  onSelectReject(){
    this.visibleReject=true;

  }
  // onSendReject(){
  //   this.onUpdateProfileStatus(this.selectedStaffId,'Reject',this.reason)
  //   this.visibleReject=false;
  // }

acceptedWorkers:any[]=[];
rejectedWorkers:any[]=[];
pendingWorkers:any[]=[];
  filterWorkersByStatus() {
    this.acceptedWorkers = this.staff.filter((worker) => worker.status === 'Accepted');
    this.rejectedWorkers = this.staff.filter((worker) => worker.status === 'Rejected');
    this.pendingWorkers = this.staff.filter((worker) => worker.status === 'InReview');
    // this.filteredWorkers = [...this.workers];
    console.log(this.staff)
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
    this.router.navigate(['/staff-details', workerId]);

  }
    viewJobs(workerId: any) {
    this.router.navigate(['/staff-jobs', workerId]);

  }
  openUpdate(workerId: any){
    this.router.navigate(['/update-staff', workerId]);

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


  onNewStaff(){

    this.router.navigate(['/create-staff'] );

  }
}
