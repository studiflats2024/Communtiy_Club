import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPlanComponent } from './add-new-plan.component';

describe('AddNewPlanComponent', () => {
  let component: AddNewPlanComponent;
  let fixture: ComponentFixture<AddNewPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
