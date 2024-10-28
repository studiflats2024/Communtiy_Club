import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgClass } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-create-issue',
  standalone: true,
  imports: [InputTextareaModule,DropdownModule,InputTextModule,DialogModule,CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule ],
  templateUrl: './create-issue.component.html',
  styleUrl: './create-issue.component.css'
})
export class CreateIssueComponent {


  itemsLink:any;
  images:any;
  issueId:any;
  issueName:any;
  aprtNo:any;
  requestedBy:any;
  userTypes:any[]=[];
  issueTypes:any[]=[];
  description:any;

  selectedUserType:any;
  selectedIssueType:any;


  ngOnInit() {

    this.itemsLink = [
      { label: 'issues', routerLink: '/issues-list' },
      { label: 'Create Issue', routerLink: '/create-issue' }
    ];

    this.userTypes = [
      { name: 'Worker', code: '0' },
      { name: 'Staff', code: '1' },
    ];

    this.issueTypes = [
      { name: 'Cleaner', code: '0' },
      { name: 'Plumbing', code: '1' },
    ];
  }
}
