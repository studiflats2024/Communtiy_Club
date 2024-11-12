import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgClass } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IssuesService } from '../../../services/issues.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';


import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';

import { AvatarGroupModule } from 'primeng/avatargroup';



@Component({
  selector: 'app-issue-details',
  standalone: true,
  imports: [ButtonModule, DialogModule, AvatarGroupModule,AvatarModule,ToastModule,CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule ],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.css',
  providers: [MessageService]
})
export class IssueDetailsComponent {

  itemsLink:any;
  images:any[]=[];

  constructor(private router: Router,private cdr: ChangeDetectorRef,private messageService: MessageService,private route: ActivatedRoute,private issuesService: IssuesService){

  }

  selectedWorker :any;
  selectedIssueId:any

  ngOnInit() {


    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { selectedWorker: any };

    // if (state?.selectedStaff) {
    //   this.selectedStaff = state.selectedStaff;
    //   console.log('Assigned Staff:', this.selectedStaff);
    // }

       // Check if state is available
       if (state&&localStorage.getItem('issueIDdetails')) {
        this.selectedWorker = state.selectedWorker;
        console.log('state')
      console.log('Assigned Worker:', this.selectedWorker);
      this.selectedIssueId=localStorage.getItem('issueIDdetails');
      console.log(this.selectedIssueId)

      this.assignIssueToUser(this.selectedIssueId,this.selectedWorker?.id);

      } else  if(localStorage.getItem('issueIDdetails')){
        // Fallback to using history.state for page reloads or direct navigation
        this.selectedWorker = history.state.selectedWorker;
        console.log('history')
      console.log('Assigned Worker:', this.selectedWorker);
      this.selectedIssueId=localStorage.getItem('issueIDdetails');
      console.log(this.selectedIssueId)
      this.assignIssueToUser(this.selectedIssueId,this.selectedWorker?.id);



      }

    this.issueId = this.route.snapshot.paramMap.get('id');
    console.log('Issue ID:', this.issueId);

    this.  fetchIssueDetails();

    this.itemsLink = [
      { label: 'issues List', routerLink: '/issues-list' },
      { label: 'issue Details', routerLink: '/issue-details' }
    ];




  }


  get displayedThumbnails() {
    return this.images.slice(this.currentIndex, this.currentIndex + 4);
  }

  changeMainImage(img: string) {
    this.currentImage = img.includes('https') ? img : '../../../assets/images/apartmentImages/default_apartment.jpg';
  }

  next() {
    if (this.currentIndex + 5 < this.images.length) {
      this.currentIndex += 1;
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    }
  }

  currentImagee: string | null = null;
  currentImage!: string;
  currentIndex: number = 0;

  openImagePopup(imageUrl: string) {
    this.currentImagee = imageUrl;
  }

  closePopup() {
    this.currentImagee = null;
  }


  issueData:any;
  issueId:any;
  assigned:boolean=false;
  picked:boolean=false;
  fetchIssueDetails() {
    this.issuesService.getIssueDetails(this.issueId).subscribe(
      response => {
        console.log('Issue details:', response);
        this.issueData = response;
        this.images=response.issue_Images
        this.currentImage =  this.images[0];
        console.log(this.currentImage)
        if(response.issue_Status==='Assigned' || response.issue_Status==='PickedUp'){
          this.assigned=true;
          if(response.issue_Status==='PickedUp'){
            this.picked=true;
          }
        }


      },
      error => {
        console.error('Error fetching issue details:', error);
      }
    );
  }
disablePublish:boolean=false;
  publishIssue() {
    this.issuesService.setIssuePublishStatus(this.issueId).subscribe(
      (response:any) => {
        // this.disablePublish=!this.disablePublish;
        this.issueData.is_Published=!this.issueData.is_Published;
        this.cdr.detectChanges();
        console.log('Issue published successfully:', response);

        this.messageService.add({severity: 'success', summary: 'Success', detail:response.message});


      },
      (error:any) => {
        console.error('Error publishing issue:', error);
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to publish issue!'});
      }
    );
  }

  onChooseType(type:string){
    if(type==='staff'){
      this.router.navigate(['/staff-list'], { queryParams: { selectMode: 'assignFromDetails' } });
    }else if(type='worker'){
      this.router.navigate(['/workers-requests'], { queryParams: { selectMode: 'assignFromDetails' } });

    }
  }

  visibleAssignTable:boolean=false;
  onAssign(){
   this.visibleAssignTable=true;
   localStorage.setItem('issueIDdetails',this.issueData.issue_ID)
  }


  assignSuccess:boolean =false;
  assignIssueToUser(issueId: string, assignsId: string) {
    this.issuesService.assignIssue(issueId, assignsId).subscribe(
      response => {
        this.assignSuccess=true;
        console.log('Issue assigned successfully:', response);
        localStorage.removeItem('issueIDdetails');
        this.assigned=true;
      },
      error => {
        console.error('Error assigning issue:', error);
      }
    );
  }



  displayImageDialog: boolean = false;
  selectedImage: string | null = null;
  image: string | null='https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-natural-scenery-painting-cabin-by-a-lake-free-image.jpeg?w=600&quality=80'

  // Function to open the image in the dialog
  openImage(imageUrl: any) {
    this.selectedImage = imageUrl;
    this.displayImageDialog = true;
  }

  // Optional: Function to close the dialog
  closeDialog() {
    this.displayImageDialog = false;
    this.selectedImage = null;
  }


}
