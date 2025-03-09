import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    //fixture = TestBed.createComponent(HomePage);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
  it('should show available active trips', () => {
    expect(true).toBeTruthy();
    //todo: make the rest of the test
  });
  it('should show active booking if a booking is pending', () => {
    expect(true).toBeTruthy();
    //todo: make the rest of the test
  });
  it('should show active trip if user has an active trip', () => {
    expect(true).toBeTruthy();
    //todo: make the rest of the test
  });
  it('should show trips history', () => {
    expect(true).toBeTruthy();
    //todo: make the rest of the test
  });
});
