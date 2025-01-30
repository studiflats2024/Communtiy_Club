import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgClass } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ActivityService } from '../../services/activity.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-activity-details',
  standalone: true,
    imports: [BadgeModule,TabViewModule,TagModule,TableModule,ButtonModule,MenuModule,OverlayPanelModule,CardModule,ToastModule,DialogModule,CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule ],
    providers: [MessageService],
  
  templateUrl: './activity-details.component.html',
  styleUrl: './activity-details.component.css'
})
export class ActivityDetailsComponent {
  items:any;
  activeTab: string = 'basic-info';
  sessions = [
    {
      title: 'Session 1 - Beginner - Learning the alphabet and correct pronunciation.',
      date: '17 Feb 2025',
      link: 'https://example.com',
      time: '10:00 AM - 12:00 PM',
    },
    {
      title: 'Session 2 - Basic Grammar and Sentence Formation.',
      date: '18 Feb 2025',
      link: 'https://example.com',
      time: '10:00 AM - 12:00 PM',
    },
    {
      title: 'Session 3 - Practical Conversations.',
      date: '19 Feb 2025',
      link: 'https://example.com',
      time: '10:00 AM - 12:00 PM',
    },
  ];
constructor(private messageService:MessageService,private activityService:ActivityService){

}

ngOnInit() {

 


  this.items = [
    { label: 'Community Club', routerLink: '/dashboard' },

    { label: 'Activities', routerLink: '/activities' },


    { label: 'Activity Details', routerLink: '/activity-details' },
    
  ];

  
}

}
