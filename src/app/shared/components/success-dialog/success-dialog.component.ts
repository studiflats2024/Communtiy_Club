import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [
    DialogModule
  ],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.css'
})
export class SuccessDialogComponent {

  @Input() visible: boolean = false;
  @Input() message: string = '';
  @Input() url: string = '';

  @Output() close = new EventEmitter<void>();
  @Output() visibleChange = new EventEmitter<boolean>(); 

}
