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
  selector: 'app-create-staff',
  standalone: true,
  imports: [RadioButtonModule,CheckboxModule,ChipModule,InputNumberModule,ToastModule,MultiSelectModule,CalendarModule,DragDropModule,ButtonModule,GalleriaModule,FileUploadModule,InputTextareaModule,DropdownModule,InputTextModule,DialogModule,CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule ],

  templateUrl: './create-staff.component.html',
  styleUrl: './create-staff.component.css',
  providers: [MessageService]
})
export class CreateStaffComponent {
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
  password:any;

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
      { label: 'Create Staff', routerLink: '/create-staff' }
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


  onAddSkill() {
    if (this.newSkill.trim()) {
      this.staffService.addNewSkill(this.newSkill).subscribe(
        (response) => {
          console.log('Skill added successfully:', response);
          this.skills.push(response); // Update skills list
          this.newSkill = ''; // Clear input field
        },
        (error) => {
          console.error('Error adding skill:', error);
        }
      );

    } else {
      alert('Please enter a skill before submitting.');
    }
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



toggleDaySelection(day:any) {
  day.selected = !day.selected;
  // console.log('Selected Days:', this.getSelectedDays());
}




// days = [
//   { name: 'Sunday', selected: false },
//   { name: 'Monday', selected: false },
//   { name: 'Tuesday', selected: false },
//   { name: 'Wednesday', selected: false },
//   { name: 'Thursday', selected: false },
//   { name: 'Friday', selected: false },
//   { name: 'Saturday', selected: false }
// ];

// days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// staffAvailabilities: any[] = [];

addAvailability() {
  this.staffAvailabilities.push({ day: '', from: '', to: '', selected: false });
}

removeAvailability(index: number) {
  this.staffAvailabilities.splice(index, 1);
}
selectedDay:string | null = null;;
onDaySelectionChange(day:any ) {

   this.selectedDay=day?.name;
   console.log('day',this.selectedDay)
   this.labelAvailable='Save'


}

onFromTimeChange(from:any){
this.work_from=from;
this.labelAvailable='Save'

}
onToTimeChange(to:any){
  this.work_to=to;
  this.labelAvailable='Save'

  }
openAvailable:boolean=false;
//   openAddAvailable(){
// this.openAvailable=!this.openAvailable
//   }

//   saveAvailableDetails(){
//     this.staffAvailabilities.push({
// day:this.day,
// from:this.work_from,
// to:this.work_to

//     })
//   }
labelAvailable:string='Save';
saved:boolean=false;
// saveAvailableDetails() {
//   const formattedFrom = new Date(this.work_from).toLocaleTimeString([], {
//     hour: '2-digit',
//     minute: '2-digit',
//   });
//   const formattedTo = new Date(this.work_to).toLocaleTimeString([], {
//     hour: '2-digit',
//     minute: '2-digit',
//   });

//   const newEntry = {
//     day: this.selectedDay,
//     from: formattedFrom,
//     to: formattedTo,
//   };

//   const exists = this.staffAvailabilities.some(
//     (availability) =>
//       availability.day === newEntry.day &&
//       availability.from === newEntry.from &&
//       availability.to === newEntry.to
//   );

//   if (exists) {

//     this.staffAvailabilities = this.staffAvailabilities.filter(
//       (availability) =>
//         !(
//           availability.day === newEntry.day &&
//           availability.from === newEntry.from &&
//           availability.to === newEntry.to
//         )
//     );
//     console.log('Entry removed:', newEntry);
//     this.labelAvailable='Save'

//   } else {
//     this.labelAvailable='UnSave'

//     this.staffAvailabilities.push(newEntry);
//     this.saved=true;
//     this.selectedDay=''
//     this.work_from=''
//     this.work_to=''
//     console.log('Entry added:', newEntry);
//   }

//   console.log('Updated staffAvailabilities:', this.staffAvailabilities);
// }
//////////////////////////////////////////////test////////////////////

  // قائمة الأيام
  days = [
    { name: 'Sunday' },
    { name: 'Monday' },
    { name: 'Tuesday' },
    { name: 'Wednesday' },
    { name: 'Thursday' },
    { name: 'Friday' },
    { name: 'Saturday' },
  ];

  // قائمة توفر الموظفين
  staffAvailabilities: Array<any> = [];

  // البيانات المؤقتة للإضافة أو التعديل
  newAvailability = {
    day: null,
    from: null,
    to: null,
  };

  // مؤشر إذا كنا نعدل بدلاً من الإضافة
  editIndex: number | null = null;

  // فتح فورم الإضافة/التعديل
  openAddAvailable() {
    this.newAvailability = { day: null, from: null, to: null };
    this.editIndex = null; // التأكد من أن العملية هي إضافة
  }

  revertToOriginalDate(timeString: string) {
    const [time, modifier] = timeString.split(' '); // Split into time and AM/PM
    let [hours, minutes] = time.split(':').map(Number);

    // Adjust hours for PM
    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    const originalDate = new Date();
    originalDate.setHours(hours);
    originalDate.setMinutes(minutes);
    originalDate.setSeconds(0);
    originalDate.setMilliseconds(0);

    return originalDate;
  }

  // حفظ بيانات جديدة أو تحديث بيانات حالية
  saveAvailableDetails() {
    const formattedFrom = new Date(this.newAvailability.from!).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const formattedTo = new Date(this.newAvailability.to!).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const newEntry = {
      day: this.newAvailability.day,
      from: formattedFrom,
      to: formattedTo,
    };

    if (this.editIndex !== null) {
      // تعديل البيانات الموجودة
      this.staffAvailabilities[this.editIndex] = newEntry;
      this.editIndex = null; // إلغاء وضع التعديل
    } else {
      // إضافة بيانات جديدة
      this.staffAvailabilities.push(newEntry);
    }

    // إعادة تعيين النموذج
    this.newAvailability = { day: null, from: null, to: null };
  }

  // حذف إدخال معين
  deleteAvailability(index: number) {
    this.staffAvailabilities.splice(index, 1); // إزالة الإدخال
  }

  // تعديل إدخال معين
  editAvailability(index: number) {
    const availability = this.staffAvailabilities[index];
    availability.from=this.revertToOriginalDate(availability.from);
    availability.to=this.revertToOriginalDate(availability.to);
    console.log(availability)

    this.newAvailability = { ...availability }; // تحميل البيانات في النموذج
    this.editIndex = index; // تحديد الإدخال الذي يتم تعديله
  }

//////////////////////////////////////////////test///////////////////////

onTimeChange(index: number) {
  const availability = this.staffAvailabilities[index];
  if (availability.selected && (!availability.from || !availability.to)) {
    alert('Please specify both "From" and "To" times.');
  }
}


// onDaySelectionChange(day:any) {
//   const selectedDays = this.days
//     .filter(day => day.selected)
//     .map(day => day.name);
//   console.log('Selected Days:', selectedDays);
// }

// getSelectedDays(day:any) {
//   return this.days.filter(day => day.selected).map(day => day.name);
//   this.day=day
// }


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
  // images: any[] = [];
  images: string = '';

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
          // this.images.push(imageUrl);
          this.images=imageUrl;

          this.loading = false;
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }



  // removeImage(index: number) {
  //   this.images.splice(index, 1);
  // }
  removeImage() {
    this.images='';
  }

  onDragStart(event: any, img: any) {
    this.draggedImage = img;
  }

  // onDrop(event: any, index: number) {
  //   if (this.draggedImage) {
  //     const draggedIndex = this.images.indexOf(this.draggedImage);
  //     this.images.splice(draggedIndex, 1);
  //     this.images.splice(index, 0, this.draggedImage);
  //     this.draggedImage = null;
  //   }
  // }

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
