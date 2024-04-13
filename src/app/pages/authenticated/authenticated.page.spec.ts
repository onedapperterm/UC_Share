import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticatedPage } from './authenticated.page';

describe('AuthenticatedPage', () => {
  let component: AuthenticatedPage;
  let fixture: ComponentFixture<AuthenticatedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AuthenticatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
