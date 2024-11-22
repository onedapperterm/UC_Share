import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterFormComponent } from './register-form.component';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userSessionServiceSpy: jasmine.SpyObj<UserSessionService>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    // Mock services
    userSessionServiceSpy = jasmine.createSpyObj('UserSessionService', ['signUp']);
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);

    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
        RegisterFormComponent,
      ],
      providers: [
        { provide: UserSessionService, useValue: userSessionServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize confirmPassword validator on ngOnInit', () => {
    const confirmPasswordControl = component.registerForm.get('confirmPassword');
    const passwordControl = component.registerForm.get('password');

    expect(confirmPasswordControl?.validator).toBeDefined();
    passwordControl?.setValue('password123');
    confirmPasswordControl?.setValue('password123');

    expect(confirmPasswordControl?.valid).toBeTrue();

    confirmPasswordControl?.setValue('differentPassword');
    expect(confirmPasswordControl?.valid).toBeFalse();
  });

  it('should make the form invalid when required fields are empty', () => {
    component.registerForm.setValue({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      career: '',
      password: '',
      confirmPassword: '',
    });

    expect(component.registerForm.valid).toBeFalse();
  });

  it('should validate email field', () => {
    const emailField = component.registerForm.get('email');
    emailField?.setValue('invalidEmail');
    expect(emailField?.valid).toBeFalse();

    emailField?.setValue('valid.email@example.com');
    expect(emailField?.valid).toBeTrue();
  });

  it('should validate phoneNumber field', () => {
    const phoneField = component.registerForm.get('phoneNumber');
    phoneField?.setValue('12345');
    expect(phoneField?.valid).toBeFalse();

    phoneField?.setValue('1234567890');
    expect(phoneField?.valid).toBeTrue();
  });

  it('should assign "passenger" role if isDriverRole is false', () => {
    component.isDriverRole = false;

    component.registerForm.setValue({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '9876543210',
      career: 'Designer',
      password: 'securePassword',
      confirmPassword: 'securePassword',
    });

    component.onSubmit();

    expect(userSessionServiceSpy.signUp).toHaveBeenCalledWith(
      jasmine.objectContaining({
        roles: ['passenger'],
      })
    );
  });
});
