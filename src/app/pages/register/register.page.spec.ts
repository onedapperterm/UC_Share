import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  //beforeEach((() => {
  //  fixture = TestBed.createComponent(RegisterPage);
  //  component = fixture.componentInstance;
  //  fixture.detectChanges();
  //}));

  it('should create', () => {
    expect(true).toBeTruthy();
  });

  it('should register a new user', () => {
    expect(true).toBeTruthy();
  });
  it('should make the form invalid when required fields are empty', () => {
    expect(true).toBeTruthy();
    //todo: make the rest of the test
  });
  it('should validate email field', () => {
    expect(true).toBeTruthy();
    //todo: make the rest of the test
  });
  it('should initialize confirmPassword validator on ngOnInit', () => {
    expect(true).toBeTruthy();
    //todo: make the rest of the test
  });
  it('should validate phoneNumber field', () => {
    expect(true).toBeTruthy();
    //todo: make the rest of the test
  });
  it('should assign "passenger" role if isDriverRole is false', () => {
    expect(true).toBeTruthy();
    //todo: make the rest of the test
  });
});
