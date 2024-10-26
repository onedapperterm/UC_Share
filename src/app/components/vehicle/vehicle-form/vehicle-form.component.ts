import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoreModule } from '@app_core/core.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    TranslateModule,
  ]
})
export class VehicleFormComponent  implements OnInit {

  public vehicleForm = this._formBuilder.group({
    brand: ['', Validators.required],
    plates: ['', [Validators.required, Validators.pattern(/([A-Z]{3}\d{3}|[A-Z]{3}\d{2}[A-Z])/)]],
    carModel: ['', Validators.required],
    color: ['', Validators.required],
    vehicleType: ['', Validators.required],
    seats: ['', [Validators.required, Validators.pattern(/(\d{1})$/)]]
  });

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {}

  onSubmit(){
    // let data = {
    //   ...this.registerForm.value,
    //   displayName: `${this.registerForm.value.firstName} ${this.registerForm.value.lastName}`,
    //   roles: this.isDriverRole ? ['driver', 'passenger'] : ['passenger'],
    // };
    // delete data.confirmPassword;

    // this._userSessionService.signUp(data as CreateUserDto);
  }
}
