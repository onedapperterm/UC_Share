import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginFormComponent } from './login-form.component';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let userSessionServiceSpy = jasmine.createSpyObj('UserSessionService', ['login']);
  let activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
        LoginFormComponent,
      ],
      providers: [
        { provide: UserSessionService, useValue: userSessionServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();


    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    userSessionServiceSpy = TestBed.inject(UserSessionService) as jasmine.SpyObj<UserSessionService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with default values', () => {
    const form = component.loginForm;
    expect(form).toBeDefined();
    expect(form.get('emailAddress')?.value).toBe('');
    expect(form.get('password')?.value).toBe('');
    expect(form.valid).toBeFalse();
  });

  it('should make the form invalid when fields are empty', () => {
    component.loginForm.setValue({ emailAddress: '', password: '' });
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should validate email field', () => {
    const emailField = component.loginForm.get('emailAddress');
    emailField?.setValue('invalidEmail');
    expect(emailField?.valid).toBeFalse();

    emailField?.setValue('valid.email@example.com');
    expect(emailField?.valid).toBeTrue();
  });

  it('should validate password field', () => {
    const passwordField = component.loginForm.get('password');
    passwordField?.setValue('123');
    expect(passwordField?.valid).toBeFalse();

    passwordField?.setValue('123456');
    expect(passwordField?.valid).toBeTrue();
  });

});
