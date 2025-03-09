import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginFormComponent } from '@app_components/user/login-form/login-form.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        LoginPage,
        LoginFormComponent
      ],
      providers: [
        provideMockStore({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make the form invalid when fields are empty', () => {
    expect(component).toBeTruthy();
    //todo: make the rest of the test
  });
  it('should validate password field', () => {
    expect(component).toBeTruthy();
    //todo: make the rest of the test
  });
  it('should initialize the login form with default values', () => {
    expect(component).toBeTruthy();
    //todo: make the rest of the test
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
    //todo: make the rest of the test
  });
  it('should validate email field', () => {
    expect(component).toBeTruthy();
    //todo: make the rest of the test
  });

});
