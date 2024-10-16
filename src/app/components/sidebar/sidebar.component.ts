import { Component , Input} from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() showSidebar = true;
  constructor(private authService :AuthService){}

  logoutCall(){
    this.authService.logout();
  }
}
