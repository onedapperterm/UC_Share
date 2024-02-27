import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginFormComponent } from '@app_components/user/login-form/login-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, LoginFormComponent]
})
export class LoginPage {

  constructor() { }

}
