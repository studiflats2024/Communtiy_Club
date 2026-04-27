import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    DialogModule
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

  // Inputs
  @Input() visible = false;
  @Input() message = '';
  @Input() iconUrl = '';
  @Input() confirmText = 'Yes';
  @Input() cancelText = 'No';

  // Outputs
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() visibleChange = new EventEmitter<boolean>();

  onConfirm() {
    this.confirm.emit();
    this.closeDialog();
  }

  onCancel() {
    this.cancel.emit();
    this.closeDialog();
  }

  private closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
