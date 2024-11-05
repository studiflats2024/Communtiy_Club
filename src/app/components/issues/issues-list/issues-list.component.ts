import { IssuesService } from './../../../services/issues.service';
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
  selectedIssue:any;


  @ViewChild('dt2') dt2!: Table;
  workers!: any[];
  loading: boolean = false;
  value:any;
  selectedCustomer: any;



  statuses = [
    { label: 'pending', value: 'pending' },
    { label: 'accepted', value: 'accepted' },
    { label: 'rejected', value: 'rejected' },

  ];

  constructor( private router: Router,private messageService: MessageService,private issuesService: IssuesService,private route: ActivatedRoute) {}
selectedStaff:any;
  ngOnInit() {
    this.loadIssues();
    this.filterIssuesByStatus();


    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { selectedStaff: any };

    if (state?.selectedStaff) {
      this.selectedStaff = state.selectedStaff;
      console.log('Assigned Staff:', this.selectedStaff);
    }

       // Check if state is available
       if (state&&localStorage.getItem('issueID')) {
        this.selectedStaff = state.selectedStaff;
        console.log('state')
      console.log('Assigned Staff:', this.selectedStaff);
      this.selectedIssueId=localStorage.getItem('issueID');
      console.log(this.selectedIssueId)

      this.assignIssueToUser(this.selectedIssueId,this.selectedStaff?.id);

      } else  if(localStorage.getItem('issueID')){
        // Fallback to using history.state for page reloads or direct navigation
        this.selectedStaff = history.state.selectedStaff;
        console.log('history')
      console.log('Assigned Staff:', this.selectedStaff);
      this.selectedIssueId=localStorage.getItem('issueID');
      console.log(this.selectedIssueId)
      this.assignIssueToUser(this.selectedIssueId,this.selectedStaff?.id);



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

            this.publishIssue(this.selectedIssueId);

        }
      }

    ];







    // setTimeout(() => {
    //   this.loading = false;
    // }, 1000);










    this.itemsLink = [
      { label: 'Staff List', routerLink: '/staff-list' },
      { label: 'Staff Details', routerLink: '/staff-details' }
    ];

  }
assignSuccess:boolean =false;
  assignIssueToUser(issueId: string, assignsId: string) {
    this.issuesService.assignIssue(issueId, assignsId).subscribe(
      response => {
        this.assignSuccess=true;
        console.log('Issue assigned successfully:', response);
        localStorage.removeItem('issueID');
      },
      error => {
        console.error('Error assigning issue:', error);
      }
    );
  }

  selectedIssueId:any;
  selectIssue(workerId:any) {
    this.selectedIssueId = workerId;
    localStorage.setItem('issueID',this.selectedIssueId)

    console.log('selectedIssue',this.selectedIssueId)
  }

  disablePublish:boolean=false;
  publishIssue(issueId:any) {
    this.issuesService.setIssuePublishStatus(issueId).subscribe(
      (response:any) => {
        this.disablePublish=true;

        console.log('Issue published successfully:', response);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Issue published successfully!'});
        this.openSuccess();
      },
      (error:any) => {
        console.error('Error publishing issue:', error);
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to publish issue!'});
      }
    );
  }








  //////////////////////////////////table here//////////////////////////////


  issues: any[] = [];
loadIssues(){
  this.issuesService.getAllIssues(1, 20000).subscribe(
    (response) => {
      console.log('Data received:', response);

      // Map the response data to a structured array of issues
      this.issues = response.data.map((issue: any) => ({
        id: issue.issue_ID,
        code: issue.issue_Code,
        requestedByPic: issue.requested_By_Pic,
        requestedByName: issue.requested_By_Name,
        apartmentCode: issue.apartment_Code,
        issuesNames: issue.issues_Names.join(', '), // Join names as a comma-separated string
        reportedAt: issue.issue_Reported_At,
        assignedTo: issue.issue_Assigned_To,
        status: issue.issue_Status
      }));
      console.log('issues:', this.issues);
      this.filterIssuesByStatus()

    },
    (error) => {
      console.error('Error fetching issues data:', error);
    }
  );
}
issuesWorker:any[]=[];
issuesCleaner:any[]=[];
issuesCashC:any[]=[];
issuesGeneralW:any[]=[];

issuesNotAssigned:any[]=[];

  filterIssuesByStatus() {
    this.issuesNotAssigned = this.issues.filter((issue:any) => issue.assignedTo=== '');
    this.issuesWorker = this.issues.filter((issue:any) => issue.assignedTo !== '');
    this.issuesCleaner= this.issues.filter((issue:any) => issue.assignedTo !== '');
    this.issuesGeneralW= this.issues.filter((issue:any) => issue.assignedTo !== '');
    this.issuesCashC= this.issues.filter((issue:any) => issue.assignedTo !== '');



    // this.filteredWorkers = [...this.workers];
    console.log(this.issuesNotAssigned)
    console.log(this.issuesWorker)
    console.log(this.issuesCleaner)
    console.log(this.issuesGeneralW)

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
onNewIssue(){

  this.router.navigate(['/apartment-list'], { queryParams: { selectMode: 'choose' } });

}




  getSeverity(status: string): 'info' | 'success' | 'warning' | 'danger' | 'secondary' | 'contrast' {
    switch (status) {
      case 'Pending':
        return 'info';
        case 'Rejected':
          return 'danger';
      case 'Accepted':
        return 'success';
        case 'Assigned':
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
