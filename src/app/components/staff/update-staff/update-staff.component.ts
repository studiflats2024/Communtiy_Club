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
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipModule } from 'primeng/chip';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

import { Router, ActivatedRoute } from '@angular/router';
import { MenuModule } from 'primeng/menu';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IssuesService } from '../../../services/issues.service';
import { StaffService } from '../../../services/staff.service';

import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-update-staff',
  standalone: true,
  imports: [RadioButtonModule,CheckboxModule,ChipModule,InputNumberModule,ToastModule,MultiSelectModule,CalendarModule,DragDropModule,ButtonModule,GalleriaModule,FileUploadModule,InputTextareaModule,DropdownModule,InputTextModule,DialogModule,CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule ],

  templateUrl: './update-staff.component.html',
  styleUrl: './update-staff.component.css',
  providers: [MessageService]

})
export class UpdateStaffComponent {
  staffName:any;
  staffEmail:any;

  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  phoneNumber:any;
  whatsappNumber:any;
  DateOfBirth:any;

  // Optional: Validate email function
  isEmailValid(): boolean {
    return this.emailPattern.test(this.staffEmail);
  }

  countries: any[] = [];
  selectedCountry: any;
  address:any;
  newSkill:string='';
  newSkills:string='';

  addSkill:boolean=false;
  work_from:any;
  work_to:any;
  emergency:any;
  bankName:any;
  accountName:any;
  accountNumber:any;
  bic_code:any;
//////////////////////////////////////////////////////////////////////
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
  // repairTime!: Date;
  repairTime: any;

  selectedApartment:any
  selectedIssueTypes:any[]=[]

  manager:any;
  ringbell:any;
  floorNo:any;
  locAprtFloor:any;
  phone:any;
  altPhone:any;
  comments:any;

  constructor(private messageService: MessageService,private route: ActivatedRoute,private router: Router ,private staffService: StaffService,private issuesService: IssuesService) {}

  ngOnInit() {

    // this.getIssueCode();
    // this.getIssueTypes();



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

    // console.log(this.selectedApartment);
    this.loadCountries();

    this.itemsLink = [
      { label: 'staff', routerLink: '/staff-list' },
      { label: 'Update Staff', routerLink: '/update-staff' }
    ];

    // this.userTypes = [
    //   { name: 'Worker', code: '0' },
    //   { name: 'Staff', code: '1' },
    // ];

    // this.issueTypes = [
    //   { name: 'Cleaner', code: '0' },
    //   { name: 'Plumbing', code: '1' },
    // ];

    // this.periorityLevels = [
    //   { name: 'High', code: '0' },
    //   { name: 'Low', code: '1' },
    // ];
  }
  ///////////////////////////////////////////////////
  loadCountries() {
    this.staffService.getCountries().subscribe((data) => {
      this.countries = data.map((country: any) => ({
        name: country.name.common,
        code: country.cca2,
        flag: country.flags?.png || country.flags?.svg
      }));
    });
  }


  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Check if a day is in worker_Availabilities
// isDayAvailable(day: string): boolean {
//   console.log(this.profileData?.worker_Avaliabilities?.some((availability:any) => availability.day === day))
//   return this.profileData?.worker_Avaliabilities?.some((availability:any) => availability.day === day);
// }

skillsArr = [
  'Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5',
  'Skill 6', 'Skill 7', 'Skill 8', 'Skill 9', 'Skill 10',
  'Skill 11', 'Skill 12', 'Skill 13', 'Skill 14'
];
selectedSkills: string[] = [];

toggleSkill(skill: string) {
  if (this.selectedSkills.includes(skill)) {
    // Remove skill from selectedSkills array
    this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
  } else {
    // Add skill to selectedSkills array
    this.selectedSkills.push(skill);
  }
}
isSelected(skill: string): boolean {
  return this.selectedSkills.includes(skill);
}
openAddSkill(){
  this.addSkill=true;
}
addNewSkill() {
  if (this.newSkill.trim() === '') return;
  const newSkill = this.newSkill;
  if (newSkill && !this.skillsArr.includes(newSkill)) {
    this.skillsArr.push(newSkill);
    this.selectedSkills.push(newSkill)
    console.log(this.skillsArr,this.selectedSkills)
    this.newSkill = '';
  } else if (this.skillsArr.includes(newSkill)) {
    // alert('Skill already exists.');
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'This Skill is already exist'});

  }
}


toggleDaySelection(day:any) {
  day.selected = !day.selected;
  console.log('Selected Days:', this.getSelectedDays());
}




days = [
  { name: 'Sunday', selected: false },
  { name: 'Monday', selected: false },
  { name: 'Tuesday', selected: false },
  { name: 'Wednesday', selected: false },
  { name: 'Thursday', selected: false },
  { name: 'Friday', selected: false },
  { name: 'Saturday', selected: false }
];

onDaySelectionChange() {
  const selectedDays = this.days
    .filter(day => day.selected)
    .map(day => day.name);
  console.log('Selected Days:', selectedDays);
}

getSelectedDays() {
  return this.days.filter(day => day.selected).map(day => day.name);
}


  //////////////////////////////////////////////////////

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
      // assigned_ID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      userType: this.selectedUserType.name,
      issue_Desc: this.description,

      // issue_Category: [this.selectedIssueType.skill_Name],
      issue_Category: this.getSelectedIssueNames() ,


      issue_Images: this.images,
      issue_Piority: this.selectedLevel.name,
      // issue_Estimation_Solve: this.repairTime?.toISOString(),
      issue_Estimation_Solve: this.repairTime?.toString(),

      issue_Appointments: appointmentDates,

        // Additional data with correct naming from the object structure
    name_RingBell: this.ringbell,
    phoneNo: this.phone,
    alternative_PhoneNo: this.altPhone,
    comments: this.comments
    };

    this.issuesService.createNewIssue(issueData).subscribe(
      response => {
        console.log('Issue created successfully:', response);
    this.showSuccess=true

      },
      error => {
        console.error('Error creating issue:', error);
      }
    );
  }

}
