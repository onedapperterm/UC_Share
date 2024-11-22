import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripBookingPage } from './trip-booking.page';

describe('TripBookingPage', () => {
  let component: TripBookingPage;
  let fixture: ComponentFixture<TripBookingPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(TripBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
