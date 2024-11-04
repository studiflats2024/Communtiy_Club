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


import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';



@Component({
  selector: 'app-issue-details',
  standalone: true,
  imports: [  AvatarGroupModule,AvatarModule,ToastModule,CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule ],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.css',
  providers: [MessageService]
})
export class IssueDetailsComponent {

  itemsLink:any;
  images:any[]=[];

  constructor(private cdr: ChangeDetectorRef,private messageService: MessageService,private route: ActivatedRoute,private issuesService: IssuesService){

  }



  ngOnInit() {

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
  fetchIssueDetails() {
    this.issuesService.getIssueDetails(this.issueId).subscribe(
      response => {
        console.log('Issue details:', response);
        this.issueData = response;
        this.images=response.issue_Images
        this.currentImage =  this.images[0];
        console.log(this.currentImage)


      },
      error => {
        console.error('Error fetching issue details:', error);
      }
    );
  }
disablePublish:boolean=true;
  publishIssue() {
    this.issuesService.setIssuePublishStatus(this.issueId).subscribe(
      (response:any) => {
        this.disablePublish=!this.disablePublish;
        this.cdr.detectChanges();
        console.log('Issue published successfully:', response);
        if(!this.disablePublish){
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Issue published successfully!'});

        }else{
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Issue Unpublished successfully!'});
        }

      },
      (error:any) => {
        console.error('Error publishing issue:', error);
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to publish issue!'});
      }
    );
  }


}
