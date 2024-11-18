

import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  headerTitle: string = 'Default Title';

  // Define route titles based on your routes
  routeTitles: { [key: string]: string } = {
    '/login': 'Login',
    '/workers-requests': 'Worker Requests',
    '/apartment-list': 'Apartment List',
    '/worker-details': 'Worker Details',
    '/dashboard': 'Dashboard',
    '/staff-list': 'Staff List',
    '/staff-details': 'Staff Details',
    '/create-staff': 'Create Staff',
    '/staff-jobs': 'Assigned jobs',
    '/update-staff': 'Update Staff',

    '/issues-list': 'Issues List',
    '/create-issue': 'Create Issue',
    '/issue-details': 'Issue Details',
    '/update-issue': 'Update Issue',


  };

  // Method to update the header title based on the route
  // updateTitle(url: string): void {

  //   const baseRoute = url.split('/')[1];
  //   const routeKey = `/${baseRoute}`;

  //   this.headerTitle = this.routeTitles[routeKey] || 'Dashboard';
  // }
  updateTitle(url: string): void {
    // Remove query parameters by splitting at `?` and taking the first part
    const pathWithoutQuery = url.split('?')[0];

    // Then, get the base route by splitting at `/` and taking the part after the base domain
    const baseRoute = pathWithoutQuery.split('/')[1];

    // Create the routeKey using the determined baseRoute
    const routeKey = `/${baseRoute}`;

    // Set the header title based on the route or default to 'Dashboard'
    this.headerTitle = this.routeTitles[routeKey] || 'Dashboard';
  }



  @Output() toggleSidebar = new EventEmitter<void>(); // Event to toggle sidebar visibility

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }



  //////////////////////////////////////////////////
  value: string = '';
  show: string = 'false';
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() titleModule = '';


  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.updateTitle(event.urlAfterRedirects);
    });
    this.PushNotification();
    this.PushNotificationCount();
  }
  showSidebar(): void {
    this.show == 'false' ? (this.show = 'true') : (this.show = 'false');
    this.newItemEvent.emit(this.show);
  }

  detailperson(event: any, id: any): void {
    this.showEdit = [];
    event.stopPropagation();

    this.showEdit[id] == true
      ? (this.showEdit[id] = false)
      : (this.showEdit[id] = true);
  }

  showEdit: Array<boolean> = [];
  hidecard(id: any) {
    this.showEdit = [];
  }
  display1 = 'none';

  shownot() {
    //this. PushNotification()
    if (this.display1 == 'none') {
      this.display1 = 'block';
    } else {
      this.display1 = 'none';
    }
  }
  //    onLikeClicked(event:any){
  //     // event.stopPropagation();
  //  this.display1="none"

  //    }
  NotifiList: any = [];
  NotiCount: any;
  NCount: any;
  NotiCount10: any;

  PushNotification() {

  }
  PushNotificationCount() {

  }
  closenotifaction() {
    this.display1 = 'none';
  }
  ClickedOut(event: any) {
    // debugger
    // if(event.target.className != "cfresda") {
    this.display1 = 'none';

    // }
  }
  MarkReaded(id: any) {

  }
  MarkUnReaded(id: any) {


  }
  MarkAllRead() {

  }
  navigateToRoute(actionRoute: string, actionID: string,itemID:any) {
    // alert(actionRoute);
    // alert(actionID);
    switch (actionRoute) {
      // case 'Issues':
      //   this.router.navigate([`/Issue_Reports/Report-view/${actionID}`]);
      //   break;
      // case 'Owners':
      //   this.router.navigate([`/owners/owner-profile/${actionID}`]);
      //   break;
      // case 'Apartments':
      //   this.router.navigate([`/apartments/apartments-details/${actionID}`]);
      //   break;
      // case 'Workers':
      //   this.router.navigate([`/workers/worker-profile/${actionID}`]);
      //   break;
      // case 'Partners':
      //   this.router.navigate([`/partner/view-partner/${actionID}`]);
      //   break;
      //   case 'Tenants':
      //     this.router.navigate([`/users/app-edite-user-details/${actionID}`]);
      //     break;
      //   case 'Chats':
      //     this.router.navigate([`/messages/message-tiket/${actionID}`]);
      //     break;
      //   case 'Payment':
      //     this.router.navigate([`/payments/invoice/${actionID}`]);
      //     break;
      //   case 'Booking':
      //     this.router.navigate([`/apartments/booking/${actionID}`]);
      //     break;
    }
    this.MarkReaded(itemID)
  }

}
