import { CommonModule } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CoreModule } from '@app_core/core.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    TranslateModule,
    RouterLink,
  ]
})
export class RegisterFormComponent implements OnInit{

  public registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/(\d{10})$/)]],
      career: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    });

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm.controls.confirmPassword.setValidators([
      PasswordValidator.areEqual(this.registerForm.controls.confirmPassword, this.registerForm.controls.password),
      Validators.required
    ]);
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }

}

export class PasswordValidator extends Validators {
  static areEqual(control: AbstractControl, matchingControl: AbstractControl): ValidatorFn {
    return () => control.value === matchingControl.value ? null : { areEqual: true } as ValidationErrors;
  }
}
