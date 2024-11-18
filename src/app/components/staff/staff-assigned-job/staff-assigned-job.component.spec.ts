import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAssignedJobComponent } from './staff-assigned-job.component';

describe('StaffAssignedJobComponent', () => {
  let component: StaffAssignedJobComponent;
  let fixture: ComponentFixture<StaffAssignedJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffAssignedJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffAssignedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
