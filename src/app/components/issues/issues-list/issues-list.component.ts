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
import { ChangeDetectionStrategy } from '@angular/core';
import { Menu } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';



@Component({
  selector: 'app-issues-list',
  standalone: true,
  imports: [ DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],
  templateUrl: './issues-list.component.html',
  styleUrl: './issues-list.component.css',
  providers: [MessageService],

})
export class IssuesListComponent {
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
selectedStaff:any;
  ngOnInit() {

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { selectedStaff: any };

    if (state?.selectedStaff) {
      this.selectedStaff = state.selectedStaff;
      console.log('Assigned Staff:', this.selectedStaff);
    }


    this.items = [
      {
        label: 'Assign',
        // icon: 'pi pi-eye',
        command: () =>  {

            this.onAssign();

        }
      },
      {
        label: 'Publish In App',
        // icon: 'pi pi-eye',
        command: () =>  {

            this. openSuccess();

        }
      }

    ];

    this.jobs = [
      {
        id:1,
        issueId: 'ISS-001',
        representative: {
          name: 'John Doe',
          image: 'ivanmagalhaes.png', // Replace with the actual image file name
        },
        aprt_No: 'Apt-102',
        issue: 'Leaking faucet in the kitchen',
        date_report: '2024-10-23',
        status: 'InReview',
        assigned_to:'John Doe'
      },
      {
        id:2,
        issueId: 'ISS-002',
        representative: {
          name: 'Jane Smith',
          image: 'asiyajavayant.png', // Replace with the actual image file name
        },
        aprt_No: 'Apt-203',
        issue: 'Broken window in the living room',
        date_report: '2024-10-22',
        status: 'Rejected',
        assigned_to:'John Doe'

      },
      {
        id:3,
        issueId: 'ISS-003',
        representative: {
          name: 'Mark Wilson',
          image: 'asiyajavayant.png', // Replace with the actual image file name
        },
        aprt_No: 'Apt-305',
        issue: 'No electricity in the bedroom',
        date_report: '2024-10-20',
        status: 'Accepted',
        assigned_to:'John Doe'

      },
      {
        id:4,
        issueId: 'ISS-004',
        representative: {
          name: 'Lisa Brown',
          image: 'amyelsner.png', // Replace with the actual image file name
        },
        aprt_No: 'Apt-401',
        issue: 'Heating system malfunction',
        date_report: '2024-10-19',
        status: 'Accepted',
        assigned_to:'John Doe'

      },
    ];



  //  this.getWorkers();

    // setTimeout(() => {
    //   this.loading = false;
    // }, 1000);


   // workers array of objects

// workers array of objects with representative data


// this.filterWorkersByStatus();

    this.workerId = this.route.snapshot.paramMap.get('id');
    console.log(this.workerId)




    this.itemsLink = [
      { label: 'Staff List', routerLink: '/staff-list' },
      { label: 'Staff Details', routerLink: '/staff-details' }
    ];

  }











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
  // onSendRejectTable(){
  //   this.onUpdateProfileStatusTable(this.selectedWorkerId,'Reject',this.reasonTable)
  //   this.visibleRejectTable=false;
  // }
  visibleAssignTable:boolean=false;
onAssign(){
 this.visibleAssignTable=true;
}
onChooseType(type:string){
  if(type==='staff'){
    this.router.navigate(['/staff-list'], { queryParams: { selectMode: 'assign' } });
  }else if(type='worker'){
    this.router.navigate(['/workers-requests'], { queryParams: { selectMode: 'assign' } });

  }
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
    const issueId = event.data.id;
    console.log('id',issueId)
    this.router.navigate(['/issue-details', issueId]);
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
   publishSuccess:boolean=false;
  openSuccess(){
   this.publishSuccess=true;
  }
}
