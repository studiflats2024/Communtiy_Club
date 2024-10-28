import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgClass } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-issue-details',
  standalone: true,
  imports: [CommonModule,FormsModule,BreadcrumbModule,NgClass,RatingModule ],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.css'
})
export class IssueDetailsComponent {

  itemsLink:any;
  images:any;

  ngOnInit() {

    this.itemsLink = [
      { label: 'issues List', routerLink: '/issues-list' },
      { label: 'issue Details', routerLink: '/issue-details' }
    ];

    this.images = [

      'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_640.jpg',
      'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
      'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_640.jpg',
      'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
      'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_640.jpg',
      'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
      'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_640.jpg',
      'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg'

    ];
    this.currentImage = this.images[0]?.includes('https') ? this.images[0] : '../../../assets/images/apartmentImages/default_apartment.jpg';

  }


  get displayedThumbnails() {
    return this.images.slice(this.currentIndex, this.currentIndex + 4);
  }

  changeMainImage(img: string) {
    this.currentImage = img.includes('https') ? img : '../../../assets/images/apartmentImages/default_apartment.jpg';
  }

  next() {
    if (this.currentIndex + 5 < this.images.length) {
      this.currentIndex += 1;
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    }
  }

  currentImagee: string | null = null;
  currentImage!: string;
  currentIndex: number = 0;

  openImagePopup(imageUrl: string) {
    this.currentImagee = imageUrl;
  }

  closePopup() {
    this.currentImagee = null;
  }
}
