import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-circular-chart',
  standalone: true,
  imports: [],
  templateUrl: './circular-chart.component.html',
  styleUrl: './circular-chart.component.css'
})
export class CircularChartComponent implements OnChanges {
  @Input() progress: number = 0; // Progress percentage (0-100)
  @Input() primaryColor: string = '#1151B4'; // Main progress color
  @Input() backgroundColor: string = '#E7EEF8'; // Background arc color

  constructor(private cdr: ChangeDetectorRef) {}

  strokeDasharray = 251.2;  
  strokeDashoffset = 251.2;  
  // strokeDasharray = 500;  
  // strokeDashoffset = 500;

  ngOnChanges(changes: SimpleChanges) {
    // this.updateProgress();
    console.log('Progress changed:', this.progress); 
  }

  updateProgress() {
    const percentage = Math.min(Math.max(this.progress, 0), 100);
    this.strokeDashoffset = this.strokeDasharray * (1 - percentage / 100);
    console.log('Progress:', this.progress, 'StrokeDashoffset:', this.strokeDashoffset);
    this.cdr.detectChanges();
  }
  
}
