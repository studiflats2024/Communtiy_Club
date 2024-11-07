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
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';






@Component({
  selector: 'app-requests-list',
  standalone: true,
  imports: [CommonModule, DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],
  templateUrl: './requests-list.component.html',
  styleUrl: './requests-list.component.css',
  providers: [MessageService],
  // changeDetection: ChangeDetectionStrategy.Default
})
export class RequestsListComponent {
  @ViewChild('dt2') dt2!: Table;
  workers: any[] = [];
  loading: boolean = false;
  value:any;
  selectedCustomer: any;
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

  constructor(private route: ActivatedRoute,private workerService: WorkerService,private router: Router,private messageService: MessageService) {
    this.route.queryParams.subscribe((params) => {
      if (params['selectMode'] === 'assign') {
        this.selectMode = true;
        console.log(this.selectMode)
      }else if(params['selectMode'] === 'assignFromDetails') {
        this.selectMode = true;
        console.log(this.selectMode)
        this.fromDetails=true;

      }
    });
  }
  fromDetails:boolean=false;
  selectMode:boolean=false;
  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      if (params['selectMode'] === 'assign') {
        this.selectMode = true;
        console.log(this.selectMode)
      }else if(params['selectMode'] === 'assignFromDetails') {
        this.selectMode = true;
        this.fromDetails=true;
        console.log(this.selectMode)
      }
    });

    this.items = [
      {
        label: 'View Details',
        icon: 'pi pi-eye',
        command: () =>  {

            this.viewDetails(this.selectedWorkerId);

        }
      },
      {
        label: 'Accept Worker',
        icon: 'pi pi-check',
        command: () => this.onUpdateProfileStatus(this.selectedWorkerId,'Accept','')
      },
      {
        label: 'Reject Worker',
        icon: 'pi pi-times',
        command: () => this.onSelectReject()
      },
      // {
      //   label: 'Deactivate Worker',
      //   icon: 'pi pi-ban',
      //   command: () => this.deactivateWorker()
      // }
    ];

    // Mock customer data
    // this.workers = [
    //   {
    //     id: 1,
    //     requestNo:'00211',
    //     name: 'James Smith',
    //     email: "alaa@gmail.com",
    //     type:"Company",
    //     phone:'011111111',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'pending',

    //   },
    //   {
    //     id: 2,
    //     requestNo:'00233',
    //     name: 'Michael Johnson',
    //     email: "MichaelJohnson@gmail.com",
    //     type:"Individual",
    //     phone:'0117237927',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'rejected',
    //   },
    //   {
    //     id: 3,
    //     requestNo:'00255',
    //     name: 'Linda Williams',
    //     email: "LindaWilliams@gmail.com",
    //     type:"Individual",
    //     phone:'01127862367',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'accepted',
    //   },
    //   {
    //     id: 3,
    //     requestNo:'00221',
    //     name: 'David Miller',
    //     email: "DavidMiller@gmail.com",
    //     type:"Company",
    //     phone:'011273333',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'accepted',
    //   },
    //   {
    //     id: 4,
    //     requestNo:'00200',
    //     name: 'David Miller',
    //     email: "DavidMiller@gmail.com",
    //     type:"Company",
    //     phone:'011273333',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'rejected',
    //   }
    //   ,
    //   {
    //     id: 4,
    //     requestNo:'00200',
    //     name: 'David Miller',
    //     email: "DavidMiller@gmail.com",
    //     type:"Company",
    //     phone:'011273333',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'rejected',
    //   }
    //   ,
    //   {
    //     id: 4,
    //     requestNo:'00200',
    //     name: 'David Miller',
    //     email: "DavidMiller@gmail.com",
    //     type:"Company",
    //     phone:'011273333',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'rejected',
    //   }
    //   ,
    //   {
    //     id: 4,
    //     requestNo:'00200',
    //     name: 'David Miller',
    //     email: "DavidMiller@gmail.com",
    //     type:"Company",
    //     phone:'011273333',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'rejected',
    //   }
    //   ,
    //   {
    //     id: 4,
    //     requestNo:'00200',
    //     name: 'David Miller',
    //     email: "DavidMiller@gmail.com",
    //     type:"Company",
    //     phone:'011273333',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'rejected',
    //   }
    //   ,
    //   {
    //     id: 4,
    //     requestNo:'00200',
    //     name: 'David Miller',
    //     email: "DavidMiller@gmail.com",
    //     type:"Company",
    //     phone:'011273333',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'rejected',
    //   }
    //   ,
    //   {
    //     id: 4,
    //     requestNo:'00200',
    //     name: 'David Miller',
    //     email: "DavidMiller@gmail.com",
    //     type:"Company",
    //     phone:'011273333',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'rejected',
    //   }
    //   ,
    //   {
    //     id: 4,
    //     requestNo:'00200',
    //     name: 'David Miller',
    //     email: "DavidMiller@gmail.com",
    //     type:"Company",
    //     phone:'011273333',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'rejected',
    //   }
    //   ,
    //   {
    //     id: 4,
    //     requestNo:'00200',
    //     name: 'David Miller',
    //     email: "DavidMiller@gmail.com",
    //     type:"Company",
    //     phone:'011273333',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'rejected',
    //   }
    //   ,
    //   {
    //     id: 4,
    //     requestNo:'00200',
    //     name: 'David Miller',
    //     email: "DavidMiller@gmail.com",
    //     type:"Company",
    //     phone:'011273333',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'rejected',
    //   }
    //   ,
    //   {
    //     id: 4,
    //     requestNo:'00200',
    //     name: 'David Miller',
    //     email: "DavidMiller@gmail.com",
    //     type:"Company",
    //     phone:'011273333',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'rejected',
    //   }
    //   ,
    //   {
    //     id: 4,
    //     requestNo:'00200',
    //     name: 'David Miller',
    //     email: "DavidMiller@gmail.com",
    //     type:"Company",
    //     phone:'011273333',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'rejected',
    //   }
    //   ,
    //   {
    //     id: 4,
    //     requestNo:'00200',
    //     name: 'David Miller',
    //     email: "DavidMiller@gmail.com",
    //     type:"Company",
    //     phone:'011273333',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'rejected',
    //   }
    //   ,
    //   {
    //     id: 4,
    //     requestNo:'00200',
    //     name: 'David Miller',
    //     email: "DavidMiller@gmail.com",
    //     type:"Company",
    //     phone:'011273333',
    //     skills:'Plumbing, Paint & Coloring',
    //     status: 'rejected',
    //   }
    // ];
   this.getWorkers();

    // setTimeout(() => {
    //   this.loading = false;
    // }, 1000);
  }

  selectedWorker:any
  assignAlert:boolean=false;
  assignWorker(worker:any) {
     this.selectedWorker = worker;
     localStorage.setItem('selectedWorker', JSON.stringify(worker));
    if (this.selectedWorker&&this.fromDetails===false) {
      // Handle the assignment, e.g., navigate back or update the issue with the selected staff ID
      this.selectedWorker = worker;
      console.log(this.selectedWorker)
      console.log('Selected Worker:', JSON.parse(localStorage.getItem('selectedWorker') || 'null'));
      this.assignAlert=true;

      // this.router.navigate(['/issues-list'], {
      //   state: { selectedStaff: this.selectedWorker }
      // });
    }else if(this.selectedWorker&&this.fromDetails===true){
      // this.selectedWorker = worker;
      console.log('Selected Worker:', this.selectedWorker);
      this.assignAlert=true;

      // const issueIdDetails = localStorage.getItem('issueIDdetails');
      // console.log('issueidagain',issueIdDetails)
      // this.router.navigate([`/issue-details/${issueIdDetails}`], {
      //   state: { selectedWorker: this.selectedWorker }
      // });
    }
  }

  sureAssign(){
    this.selectedWorker = JSON.parse(localStorage.getItem('selectedWorker') || 'null');
    if (this.fromDetails===false) {


      this.router.navigate(['/issues-list'], {
        state: { selectedStaff: this.selectedWorker }
      });
      console.log(this.selectedWorker)
    }else if(this.fromDetails===true){


      const issueIdDetails = localStorage.getItem('issueIDdetails')|| '';
      // localStorage.setItem('issueIDAssign',issueIdDetails );

      console.log('issueidagain',issueIdDetails)
      this.router.navigate([`/issue-details/${issueIdDetails}`], {
        state: { selectedWorker: this.selectedWorker }
      });
      // localStorage.removeItem('issueIDdetails');



    }
  }

  notSureAssign(){
   this.assignAlert=false;
  }

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
  onUpdateProfileStatus(workerId:any,status:any,reason:any) {
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

  visibleReject:boolean=false;
  reason:string='';
  onSelectReject(){
    this.visibleReject=true;

  }
  onSendReject(){
    this.onUpdateProfileStatus(this.selectedWorkerId,'Reject',this.reason)
    this.visibleReject=false;
  }

acceptedWorkers:any[]=[];
rejectedWorkers:any[]=[];
pendingWorkers:any[]=[];
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
    // console.log(this.dt2.filterGlobal(inputValue, 'contains'))
  }

  onRowSelect(event: any) {
    console.log(event)
    const workerId = event.data.id;
    console.log('id',workerId)
    this.router.navigate(['/worker-details', workerId]);
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
