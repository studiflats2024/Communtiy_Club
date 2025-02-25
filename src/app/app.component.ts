import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessagingService } from './services/messaging.service';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';

import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { LoaderInterceptorComponent } from './components/loader-interceptor/loader-interceptor.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,SidebarComponent, CommonModule, LoaderInterceptorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Fixed typo from styleUrl to styleUrls
})
export class AppComponent implements OnInit {
  title = 'WorkerAdmin';
  deviceToken:any;

  showHeader = true;
  showSidebar = true;
  constructor(private messagingService: MessagingService,private router: Router) {
        // Listen to route changes
        this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
          this.showHeader = this.router.url !== '/login';
          console.log(this.showHeader)
        });
    }

    toggleSidebar() {
      this.showSidebar = !this.showSidebar; // Toggle sidebar visibility
    }
  // OnInit lifecycle hook
  ngOnInit(): void {
    console.log('AppComponent initialized!');

    // You can request permission here if necessary
    this.messagingService.requestPermission()
      .then((token:any) => {
        console.log('Device token:', token);
        this.deviceToken=token;

      })
      .catch((error:any) => {
        console.error('Error getting token:', error);
      });

    // Optionally listen for incoming notifications
    this.messagingService.receiveMessage();


     // Check screen width on initialization
     this.checkScreenWidth();
     window.addEventListener('resize', this.checkScreenWidth.bind(this));
  }

    // Check screen width and adjust sidebar visibility
    checkScreenWidth() {
      if (window.innerWidth < 992) {
        this.showSidebar = false; // Hide sidebar on small screens
      } else {
        this.showSidebar = true; // Show sidebar on large screens
      }
    }

    ngOnDestroy() {
      // Remove the event listener to avoid memory leaks
      window.removeEventListener('resize', this.checkScreenWidth.bind(this));
    }


}

