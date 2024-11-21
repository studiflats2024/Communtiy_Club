import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpClientModule } from '@angular/common/http';
import { StaffService } from '../../../services/staff.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-staff-details',
  standalone: true,
  imports: [RouterModule,InputTextareaModule,InputTextModule,DialogModule,CommonModule,ChipModule,ButtonModule,CardModule,FormsModule,NgClass,BreadcrumbModule],

  templateUrl: './staff-details.component.html',
  styleUrl: './staff-details.component.css'
})
export class StaffDetailsComponent {

  items:any;
  skills = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6', 'Skill 7'];
  workerId:any;

  constructor(private staffService: StaffService,private route: ActivatedRoute) {}

  ngOnInit() {

    this.workerId = this.route.snapshot.paramMap.get('id');
    console.log(this.workerId)

  this.skills = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6', 'Skill 7'];


    this.items = [
      { label: 'Staff List', routerLink: '/staff-list' },
      { label: 'Staff Details', routerLink: '/staff-details' }
    ];
    this.fetchStaffProfile(this.workerId)
  }
  staffProfile:any;
  fetchStaffProfile(staffId: string): void {


    this.staffService.getStaffProfile(staffId).subscribe(
      (response) => {
        console.log('Staff Profile:', response);
        this.staffProfile = response;

      },
      (error) => {
        console.error('Error fetching staff profile:', error);

      }
    );
  }
  ///modals
  visible: boolean = false;

  showDialog() {
      this.visibleReject = true;
  }
  visibleSuccess:boolean =false;
  // showDialog2(){
  //  if(this.isDeactivate===false){
  //   this.onUpdateProfileStatus(this.workerId,'Accept',this.reason)

  //  }else{
  //   this.onUpdateProfileStatus(this.workerId,'Deactivate',this.reason)

  //  }



  // }

  isDeactivate:boolean=false;
  visibleSuccessR:boolean=false;
  visibleSuccessD:boolean=false;

  // onUpdateProfileStatus(workerId:any,status:any,reason:any) {


  //   this.workerService.updateProfileStatus(workerId, status, reason).subscribe(
  //     (response) => {
  //       console.log('Status updated successfully:', response);
  //       if(status==='Accept'){
  //         this.visibleSuccess=true;
  //         this.isDeactivate=true;
  //      }else if(status==='Reject'){
  //         this.visibleReject=false;
  //         this.visibleSuccessR=true;
  //       this.isDeactivate=false;

  //      }else if(status==='Deactivate'){
  //       this.isDeactivate=false;
  //       this.visibleSuccessD=true;

  //      }
  //     },
  //     (error) => {
  //       console.error('Error updating status:', error);
  //     }
  //   );
  // }

  visibleReject:boolean=false;
  reason:string='';
  // onSendAccept(){
  //   this.onUpdateProfileStatus(this.workerId,'Accept',this.reason)

  //   this.visibleSuccess=true;

  // }
  // onSendReject(){
  //   this.onUpdateProfileStatus(this.workerId,'Reject',this.reason)

  // }

  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Check if a day is in worker_Availabilities
isDayAvailable(day: string): boolean {
  console.log(this.staffProfile?.staff_Avaliabilities?.some((availability:any) => availability.day === day))
  return this.staffProfile?.staff_Avaliabilities?.some((availability:any) => availability.day === day);
}
getWorkingHours(day: string): { from: string; to: string } | null {
  const availability = this.staffProfile?.staff_Avaliabilities?.find(
    (availability: any) => availability.day === day
  );
  console.log(availability)
  return availability || null;
}

}
