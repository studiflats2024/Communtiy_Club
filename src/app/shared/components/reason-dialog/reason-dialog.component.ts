import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-reason-dialog',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    CalendarModule,
    CommonModule
  ],
  templateUrl: './reason-dialog.component.html',
  styleUrl: './reason-dialog.component.css'
})
export class ReasonDialogComponent {

  @Input() visible: boolean = false;
  @Input() title: string = 'Write Reason';
  @Input() showDate: boolean = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<{ reason: string, date?: Date }>();
  @Output() cancel = new EventEmitter<void>();

  reason: string = '';
  date: Date | null = null;

  onCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.cancel.emit();
    this.reset();
  }

  onConfirm() {
    this.confirm.emit({
      reason: this.reason,
      date: this.date || undefined
    });

    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.reset();
  }

  private reset() {
    this.reason = '';
    this.date = null;
  }

}
