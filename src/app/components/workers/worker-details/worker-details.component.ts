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

@Component({
  selector: 'app-worker-details',
  standalone: true,
  imports: [InputTextareaModule,InputTextModule,DialogModule,CommonModule,ChipModule,ButtonModule,CardModule,FormsModule,NgClass,BreadcrumbModule],
  templateUrl: './worker-details.component.html',
  styleUrl: './worker-details.component.css'
})
export class WorkerDetailsComponent {

  items:any;
  skills = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6', 'Skill 7'];

  ngOnInit() {

  this.skills = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6', 'Skill 7'];


    this.items = [
      { label: 'Worker Requests', routerLink: '/requests-list' },
      { label: 'Worker Details', routerLink: '/worker-details' }
    ];
  }

  ///modals
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
  visibleSuccess:boolean =false;
  showDialog2(){
    this.visibleSuccess=true;
  }
}
