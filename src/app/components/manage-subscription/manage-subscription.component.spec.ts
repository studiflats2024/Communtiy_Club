import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubscriptionComponent } from './manage-subscription.component';

describe('ManageSubscriptionComponent', () => {
  let component: ManageSubscriptionComponent;
  let fixture: ComponentFixture<ManageSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSubscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
