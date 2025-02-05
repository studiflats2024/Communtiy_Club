import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteFriendsComponent } from './invite-friends.component';

describe('InviteFriendsComponent', () => {
  let component: InviteFriendsComponent;
  let fixture: ComponentFixture<InviteFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteFriendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
