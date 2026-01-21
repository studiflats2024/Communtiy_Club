import { Component } from '@angular/core';
import { ToastModule } from "primeng/toast";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SettingsService, WorkingDay, WorkingHoursUpdate } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ToastModule,
    BreadcrumbModule,
    CommonModule,
    RouterModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  items = [
    { label: 'Dashboard', routerLink: '/dashboard' },
    { label: 'Settings', routerLink: '/settings' }
  ];

  isEditMode: boolean = false;
  showSuccessPopup: boolean = false;
  workingDays: WorkingDay[] = [];
  originalWorkingDays: WorkingDay[] = [];
  validationErrors: Map<string, string> = new Map();
  validationWarnings: Map<string, string> = new Map();

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.loadWorkingHours();
  }

  // ================= API =================

  loadWorkingHours(): void {
    this.settingsService.getWorkingHours().subscribe({
      next: res => {
        if (res.succeeded && res.data) {
          this.workingDays = res.data.map(d => this.mapDtoToUi(d));
          console.log('before edit : ', this.workingDays);

          this.saveOriginalState();
        }
      },
      error: err => console.error(err)
    });
  }

  saveWorkingHours(): void {
    if (!this.validateAllDays()) return;

    const payload: WorkingHoursUpdate[] =
      this.workingDays.map(d => this.mapUiToUpdateDto(d));

    this.settingsService.updateWorkingHours(payload).subscribe({
      next: () => {
        this.saveOriginalState();
        this.isEditMode = false;
        this.showSuccessPopup = true;
        setTimeout(() => this.showSuccessPopup = false, 3000);
        this.loadWorkingHours();
      },
      error: err => console.error(err)
    });

    console.log('After Edit : ', this.workingDays);

  }

  // ================= Mapping =================

  private mapDtoToUi(dto: any): WorkingDay {
    return {
      id: dto.id,
      day: dto.day ?? '',
      dayArabic: dto.day_Code,
      dayCode: dto.day_Code,
      isEnabled: dto.is_Opened,
      fromTime: dto.open_From ?? '',
      toTime: dto.open_To ?? ''
    };
  }

  private mapUiToUpdateDto(day: WorkingDay): WorkingHoursUpdate {
    return {
      id: day.id,
      day: day.day,
      day_Code: day.dayCode,
      open_From: day.isEnabled ? day.fromTime : null,
      open_To: day.isEnabled ? day.toTime : null,
      is_Opened: day.isEnabled
    };
  }

  // Save the current state as original for comparison
  saveOriginalState(): void {
    this.originalWorkingDays = JSON.parse(JSON.stringify(this.workingDays));
  }

  // Enter edit mode
  enterEditMode(): void {
    this.workingDays = this.workingDays.map(d => ({
      ...d,
      fromTime: this.convertTo24Hour(d.fromTime),
      toTime: this.convertTo24Hour(d.toTime)
    }));

    this.originalWorkingDays = JSON.parse(JSON.stringify(this.workingDays));

    this.isEditMode = true;
    this.validationErrors.clear();
    this.validationWarnings.clear();
  }

  // Cancel edit and restore original state
  cancelEdit(): void {
    this.workingDays = JSON.parse(JSON.stringify(this.originalWorkingDays));
    this.isEditMode = false;
    this.validationErrors.clear();
    this.validationWarnings.clear();
  }

  // Check if there are any changes from original state
  hasChanges(): boolean {
    const allEnabledDaysHaveData = this.workingDays.every(day => {
      if (day.isEnabled) {
        return day.fromTime && day.toTime;
      }
      return true;
    });

    const noErrors = this.validationErrors.size === 0;

    const hasActualChanges = JSON.stringify(this.workingDays) !== JSON.stringify(this.originalWorkingDays);

    return hasActualChanges && allEnabledDaysHaveData && noErrors;
  }

  // Toggle day enabled/disabled
  onToggleChange(day: WorkingDay): void {
    // Clear validation error when day is disabled
    if (!day.isEnabled) {
      this.validationErrors.delete(day.day);
      this.validationWarnings.delete(day.day);
    } else {
      if (!day.fromTime || !day.toTime) {
        this.validationWarnings.set(day.day, 'Please enter working hours for this day');
        this.validationErrors.delete(day.day);
      } else {
        this.validationWarnings.delete(day.day);
        this.validateDay(day);
      }
    }
  }

  // Update time and validate
  onTimeChange(day: WorkingDay): void {
    this.validationWarnings.delete(day.day);
    this.validateDay(day);
  }

  validateDay(day: WorkingDay): void {
    // Skip validation if day is disabled
    if (!day.isEnabled) {
      this.validationErrors.delete(day.day);
      this.validationWarnings.delete(day.day);
      return;
    }

    // Check if both times are provided
    if (!day.fromTime || !day.toTime) {
      this.validationErrors.set(day.day, 'Please enter both start and end times');
      return;
    }

    // Convert times to minutes for comparison
    const fromMinutes = this.timeToMinutes(day.fromTime);
    const toMinutes = this.timeToMinutes(day.toTime);

    const diffMinutes = toMinutes - fromMinutes;

    // Same time or end time before start time
    if (diffMinutes <= 0) {
      this.validationErrors.set(
        day.day,
        'Start time must be earlier than end time'
      );
      return;
    }

    // More than 8 hours
    if (diffMinutes > 8 * 60) {
      this.validationErrors.set(
        day.day,
        'Working hours cannot exceed 8 hours'
      );
      return;
    }

    // ✅ Valid
    this.validationErrors.delete(day.day);
  }

  // Convert time string (HH:mm) to minutes
  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Validate all enabled days
  validateAllDays(): boolean {
    this.validationErrors.clear();

    this.workingDays.forEach(day => {
      if (day.isEnabled) {
        this.validateDay(day);
      }
    });

    return this.validationErrors.size === 0;
  }

  // Check if there are any validation errors
  hasValidationErrors(): boolean {
    return this.validationErrors.size > 0;
  }

  // Get validation errors as array for display
  getValidationErrorsArray(): Array<{ day: string, message: string }> {
    const errors: Array<{ day: string, message: string }> = [];
    this.validationErrors.forEach((message, day) => {
      errors.push({ day, message });
    });
    return errors;
  }

  hasValidationWarnings(): boolean {
    return this.validationWarnings.size > 0;
  }

  getValidationWarningsArray(): Array<{ day: string, message: string }> {
    const warnings: Array<{ day: string, message: string }> = [];
    this.validationWarnings.forEach((message, day) => {
      warnings.push({ day, message });
    });
    return warnings;
  }

  // Close success popup
  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
  }

  // Get status text for a day
  getStatusText(day: WorkingDay): string {
    return day.isEnabled ? 'Opened' : 'Closed';
  }

  // Get status class for badge
  getStatusClass(day: WorkingDay): string {

    return day.isEnabled ? 'badge-success' : 'badge-danger';
  }

  // Get time cell class for styling
  getTimeCallClass(day: WorkingDay): string {

    return day.isEnabled ? 'normal-time-cell' : 'disabled-time-cell';
  }

  convertTo24Hour(time: string | null | undefined): string {
    if (!time) return '';

    // مثال: "09:00 AM"
    const [timePart, modifier] = time.split(' ');
    if (!timePart || !modifier) return '';

    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier.toUpperCase() === 'PM' && hours < 12) {
      hours += 12;
    }

    if (modifier.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  }

}
