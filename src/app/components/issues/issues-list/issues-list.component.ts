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
import { RadioButtonModule } from 'primeng/radiobutton';

import { ChangeDetectionStrategy } from '@angular/core';
import { Menu } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';  // File upload
import { GalleriaModule } from 'primeng/galleria';      // Image gallery

import { DragDropModule } from 'primeng/dragdrop';
import { InputTextareaModule } from 'primeng/inputtextarea';



@Component({
  selector: 'app-issues-list',
  standalone: true,
  imports: [InputTextareaModule,FileUploadModule,GalleriaModule,DragDropModule, RadioButtonModule,DialogModule,MenuModule,ButtonModule,ToastModule,FormsModule,NgClass,TabViewModule,BadgeModule,CardModule,TableModule,TagModule,IconFieldModule,InputIconModule,InputTextModule,MultiSelectModule,DropdownModule],
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
      localStorage.removeItem('issueIDdetails');

    this.loadIssues();
    this.filterIssuesByStatus();


    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { selectedStaff: any };


      this.selectedStaff = state?.selectedStaff || null;
      console.log(this.selectedStaff)

       // Check if state is available
       if (state&&localStorage.getItem('issueID')) {
        this.selectedStaff = state.selectedStaff;
        console.log('state')
      console.log('Assigned Staff:', this.selectedStaff);
      this.selectedIssueId=localStorage.getItem('issueID');
      console.log(this.selectedIssueId)
      console.log(this.selectedStaff?.id)


      // this.assignIssueToUser(this.selectedIssueId,this.selectedStaff?.id);
      if(this.selectedStaff?.id){
        this.assignIssueToUser(this.selectedIssueId,this.selectedStaff?.id);
        history.replaceState({}, document.title);
      }

      } else  if( localStorage.getItem('issueID')){

        this.selectedStaff = history.state.selectedStaff;
        console.log('history')
      console.log('Assigned Staff:', this.selectedStaff);
      this.selectedIssueId=localStorage.getItem('issueID');
      console.log(this.selectedIssueId)
      console.log(this.selectedStaff?.id)
      if(this.selectedStaff?.id){
        this.assignIssueToUser(this.selectedIssueId,this.selectedStaff?.id);
        history.replaceState({}, document.title);
      }







      }


    this.items = [
      // {
      //   label: 'Assign',

      //   command: () =>  {

      //       this.onAssign();

      //   }
      // }
      {
        label: this.selectedStatus === 'Assigned' ? 'Assigned' : 'Assign',
        command: () => {
          if (this.selectedStatus !== 'Assigned') {
            this.onAssign();
          }
        },
        disabled: this.selectedStatus === 'Assigned', // Disables the button if status is "Assigned"
      },
      {
        label: 'Publish In App',
        // icon: 'pi pi-eye',
        command: () =>  {

            this.publishIssue(this.selectedIssueId);

        }
      },
      {
        label: 'Update Issue',
        // icon: 'pi pi-eye',
        command: () =>  {

          this.router.navigate(['/update-issue', this.selectedIssueId]);

        }
      },
      {
        label: 'Delete Issue',
        // icon: 'pi pi-eye',
        command: () =>  {

          this.deleteIssue(this.selectedIssueId);

        }
      },
      {
        label: 'Payment Responsibility',
        // icon: 'pi pi-eye',
        command: () =>  {

          this.showPaymentDialog();

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


  ingredient: string = '';

  // You can also add a method if you want to perform an action when the value changes
  onIngredientChange() {
    console.log('Selected ingredient:', this.ingredient);
  }



assignSuccess:boolean =false;
  assignIssueToUser(issueId: string, assignsId: string) {
    this.issuesService.assignIssue(issueId, assignsId).subscribe(
      response => {
        this.assignSuccess=true;
        console.log('Issue assigned successfully:', response);
        localStorage.removeItem('issueID');
    this.loadIssues();

      },
      error => {
        console.error('Error assigning issue:', error);
      }
    );
  }

  showPayment:boolean=false;
  showPaymentDialog(){
    this.showPayment=true;
  }

  selectedIssueId:any;
  selectedStatus:any;
  selectIssue(workerId:any,status:any) {
    this.selectedIssueId = workerId;
    this.selectedStatus=status
    this.items = [
      // {
      //   label: 'Assign',

      //   command: () =>  {

      //       this.onAssign();

      //   }
      // }
      {
        label: this.selectedStatus === 'Assigned' ? 'Assigned' : 'Assign',
        command: () => {
          if (this.selectedStatus !== 'Assigned') {
            this.onAssign();
          }
        },
        disabled: this.selectedStatus === 'Assigned', // Disables the button if status is "Assigned"
      },
      {
        label: 'Publish In App',
        // icon: 'pi pi-eye',
        command: () =>  {

            this.publishIssue(this.selectedIssueId);

        }
      },
      {
        label: 'Update Issue',
        // icon: 'pi pi-eye',
        command: () =>  {

          this.router.navigate(['/update-issue', this.selectedIssueId]);

        }
      },
      {
        label: 'Delete Issue',
        // icon: 'pi pi-eye',
        command: () =>  {

          this.deleteIssue(this.selectedIssueId);

        }
      } , {
        label: 'Payment Responsibility',
        // icon: 'pi pi-eye',
        command: () =>  {

          this.showPaymentDialog();

        }
      }

    ];

    console.log('selectedIssue',this.selectedIssueId,this.selectedStatus)
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
 localStorage.setItem('issueID',this.selectedIssueId)
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




  getSeverity(status: string):'picked'| 'info' | 'success' | 'warning' | 'danger' | 'secondary' | 'contrast' {
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
        case 'PickedUp':
          return 'picked';
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


  deleteIssue(issueId: string) {
    this.issuesService.deleteIssue(issueId).subscribe(
      response => {
        console.log('Issue deleted successfully:', response);
        this.messageService.add({ severity: 'info', summary: 'deleted', detail: 'Issue Deleted Successfully' });
        this.loadIssues();

      },
      error => {
        console.error('Error deleting issue:', error);
    this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Error on delete issue' });

      }
    );
  }




  images: any[] = [];
  draggedImage: any;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  // onImageSelect(event: any) {
  //   for (let file of event.files) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.images.push(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
  loadingPhoto: boolean = false;
  description:any;

  onImageSelect(event: any) {
    this.loadingPhoto=true;
    for (let file of event.files) {
      this.issuesService.uploadImage(file).subscribe(
        (response: any) => {
          // Assuming the API returns a URL to the uploaded image
          const imageUrl = response[0].file_Path;
          console.log(imageUrl)
          this.images.push(imageUrl);
          this.loadingPhoto = false;
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }



  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  onDragStart(event: any, img: any) {
    this.draggedImage = img;
  }

  onDrop(event: any, index: number) {
    if (this.draggedImage) {
      const draggedIndex = this.images.indexOf(this.draggedImage);
      this.images.splice(draggedIndex, 1); // Remove from original position
      this.images.splice(index, 0, this.draggedImage); // Insert at new position
      this.draggedImage = null; // Reset
    }
  }

  onDragEnd(event: any) {
    this.draggedImage = null;
  }

  onDragEnter(event: any, index: number) {
    // Optional: Handle visual effects for drag over
  }
}
