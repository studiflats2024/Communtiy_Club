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
import { FileUploadModule } from 'primeng/fileupload';  // File upload
import { GalleriaModule } from 'primeng/galleria';      // Image gallery
import { ButtonModule } from 'primeng/button';
import { DragDropModule } from 'primeng/dragdrop';
import { CalendarModule } from 'primeng/calendar';


import { Router, ActivatedRoute } from '@angular/router';
import { MenuModule } from 'primeng/menu';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IssuesService } from '../../../services/issues.service';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-update-issue',
  standalone: true,
  imports: [ToastModule,MultiSelectModule,CalendarModule,DragDropModule,ButtonModule,GalleriaModule,FileUploadModule,InputTextareaModule,DropdownModule,InputTextModule,DialogModule,CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule ],

  templateUrl: './update-issue.component.html',
  styleUrl: './update-issue.component.css',
  providers: [MessageService]

})
export class UpdateIssueComponent {

  itemsLink:any;
  // images:any;
  issueId:any;
  issueName:any;
  aprtNo:any;
  requestedBy:any;
  userTypes:any[]=[];
  issueTypes:any[]=[];
  periorityLevels:any[]=[]
  description:any;

  selectedUserType:any;
  selectedIssueType:any;
  selectedLevel:any;
  repairTime!: Date;
  selectedApartment:any
  selectedIssueTypes:any[]=[]

  manager:any;
  ringbell:any;
  floorNo:any;
  locAprtFloor:any;
  phone:any;
  altPhone:any;
  comments:any;

  apartment_No:any;


  constructor(private messageService: MessageService,private route: ActivatedRoute,private router: Router ,private issuesService: IssuesService) {}

  ngOnInit() {

    this.issueId = this.route.snapshot.paramMap.get('id');
    console.log('Issue ID:', this.issueId);

    this.  fetchIssueDetails();

    // this.getIssueCode();
    this.getIssueTypes();



    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation?.extras.state as { selectedApartment: any };


    // if (state) {
    //   this.selectedApartment = state.selectedApartment;
    //   console.log('state')
    // this.getIssueCode();
    // } else {

    //   this.selectedApartment = history.state.selectedApartment;
    //   console.log('history')
    // this.getIssueCode();

    // }

    console.log(this.selectedApartment);

    this.itemsLink = [
      { label: 'issues', routerLink: '/issues-list' },
      { label: 'Update Issue'  }
    ];

    this.userTypes = [
      { name: 'Worker', code: '0' },
      { name: 'Staff', code: '1' },
    ];

    // this.issueTypes = [
    //   { name: 'Cleaner', code: '0' },
    //   { name: 'Plumbing', code: '1' },
    // ];

    this.periorityLevels = [
      { name: 'High', code: '0' },
      { name: 'Low', code: '1' },
    ];
  }

  issueCode:any;
  getIssueCode(){
    this.issuesService.getIssueCode().subscribe(
      (code) => {
        this.issueCode = code;
        console.log('Issue Code:', this.issueCode);
      },
      (error) => {
        console.error('Error fetching issue code:', error);
      }
    );
  }
skills:any;
  getIssueTypes() {
    this.issuesService.getIssueTypes().subscribe({
      next: (data) => {
        this.issueTypes = data;
        console.log('Skills:', data);
      },
      error: (error) => {
        console.error('Error fetching skills:', error);
      }
    });
  }


  //////////////////////////photos///////////////////////////
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
  loading: boolean = false;

  onImageSelect(event: any) {
    this.loading=true;
    for (let file of event.files) {
      this.issuesService.uploadImage(file).subscribe(
        (response: any) => {
          // Assuming the API returns a URL to the uploaded image
          const imageUrl = response[0].file_Path;
          console.log(imageUrl)
          this.images.push(imageUrl);
          this.loading = false;
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


  appointments: { date: Date }[] = [{ date: new Date() }];

  addAppointment() {
    this.appointments.push({ date: new Date() });
  }

  removeAppointment(index: number) {
    this.appointments.splice(index, 1);
  }



  showSuccess:boolean=false;
  showSuccessD(){
    // this.showSuccess=true
    this.submitIssue()
  }

  getSelectedIssueNames(): string[] {
    return this.selectedIssueTypes.map((item) => item.skill_ID);
  }

issueDetails:any
  fetchIssueDetails() {
    this.issuesService.getIssueDetails(this.issueId).subscribe(
      response => {
        console.log('Issue details:', response);
        this.issueDetails = response;


        this.issueName = this.issueDetails?.issue_Name;
      this.aprtNo = this.issueDetails?.apartment_No;
      this.requestedBy = this.issueDetails?.requested_By;
      this.description = this.issueDetails?.issue_Desc;
      this.selectedUserType = this.issueDetails?.userType;
      this.selectedLevel = this.issueDetails?.issue_Priority;
      this.repairTime = new Date(this.issueDetails?.issue_Estimation_Repair);
      this.manager = this.issueDetails?.property_Manager;
      this.ringbell = this.issueDetails?.nameRing_Bill;
      this.floorNo = this.issueDetails?.floor_No;
      this.locAprtFloor = this.issueDetails?.apartment_Location;
      this.phone = this.issueDetails?.phoneNo;
      this.altPhone = this.issueDetails?.alternative_Phone;
      this.comments = this.issueDetails?.comments;
      this.selectedIssueType= this.issueDetails?.issue_Category ? this.issueDetails?.issue_Category.join(', ') : 'Select Types'
      this.images=this.issueDetails?.issue_Images
      this.initializeAppointments();
      this.issueCode=this.issueDetails?.issue_Code;
      this.apartment_No=this.issueDetails?.apartment_No;

      },
      error => {
        console.error('Error fetching issue details:', error);
      }
    );
  }


  initializeAppointments() {
    if (this.issueDetails?.issue_Appointments?.length) {
      this.appointments = this.issueDetails.issue_Appointments.map((appointment: string) => ({
        date: new Date(appointment), // Convert string to Date object
      }));
    }
  }

  submitIssue() {




    if (!this.issueName) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Issue name is required'});
      return;
    }


    if (!this.requestedBy) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Requested by is required'});
      return;
    }

    if (!this.selectedUserType?.name) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'User type is required'});
      return;
    }

    if (!this.description) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Description is required'});
      return;
    }

    if (!this.getSelectedIssueNames()?.length) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'At least one issue category is required'});
      return;
    }

    if (!this.selectedLevel?.name) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Priority level is required'});
      return;
    }

    if (!this.repairTime) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Estimated repair time is required'});
      return;
    }

    // Additional field validations


  if (!this.ringbell) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Name on the Ringbell is required'});
    return;
  }



  if (!this.phone) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Phone number is required'});
    return;
  }

  if (!this.altPhone) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Alternative phone number is required'});
    return;
  }

  if (!this.comments) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Comments are required'});
    return;
  }


    const appointmentDates = this.appointments
    .filter(appointment => appointment.date) // Ensure date is not null
    .map(appointment => appointment.date!.toISOString());

    console.log(appointmentDates);

    const issueData = {
      apartment_ID: this.selectedApartment.apartment_ID,
      issue_Code: this.issueCode,
      issue_Name: this.issueName,
      apartment_No: this.aprtNo,
      requested_By: this.requestedBy,
      assigned_ID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userType: this.selectedUserType.name,
      issue_Desc: this.description,

      // issue_Category: [this.selectedIssueType.skill_Name],
      issue_Category: this.getSelectedIssueNames() ,


      issue_Images: this.images,
      issue_Priority: this.selectedLevel.name,
      issue_Estimation_Solve: this.repairTime?.toISOString(),
      issue_Appointments: appointmentDates,

        // Additional data with correct naming from the object structure
    name_RingBell: this.ringbell,
    phoneNo: this.phone,
    alternative_PhoneNo: this.altPhone,
    comments: this.comments
    };

    this.issuesService.updateIssue(issueData).subscribe(
      response => {
        console.log('Issue updated successfully:', response);
    this.showSuccess=true

      },
      error => {
        console.error('Error updating issue:', error);
      }
    );
  }
}
