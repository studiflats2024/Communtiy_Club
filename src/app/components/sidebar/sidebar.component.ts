import { Component , Input} from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() showSidebar = true;
  constructor(private authService :AuthService){}

  logoutCall(){
    this.authService.logout();
  }
  display = 'none';

  logoutModal() {
    this.display = 'block';
    this.display = 'flex';
  }
  onCloseHandled() {
    this.display = 'none';
  }
  onSubmitModal2(){
    // this.authenticationService.logout() ;
    this.authService.logout();


}
}
