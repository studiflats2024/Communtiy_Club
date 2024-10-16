
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
// import { UploadFileService } from 'src/app/_services/UploadFile/upload-file.service';
// import { AdminsService } from 'src/app/_services/admins/admins.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  @Output() toggleSidebar = new EventEmitter<void>(); // Event to toggle sidebar visibility

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }



  //////////////////////////////////////////////////
  value: string = '';
  show: string = 'false';
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() titleModule = '';


  constructor( ) {}
  ngOnInit() {
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
