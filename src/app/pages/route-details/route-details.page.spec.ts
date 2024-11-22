import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteDetailsPage } from './route-details.page';

describe('RouteDetailsPage', () => {
  let component: RouteDetailsPage;
  let fixture: ComponentFixture<RouteDetailsPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(RouteDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
