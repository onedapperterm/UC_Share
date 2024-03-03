import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthCredentials } from '@app_core/auth/model/auth.model';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { CoreModule } from '@app_core/core.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
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
export class LoginFormComponent {
  public loginForm = this._formBuilder.group({
    emailAddress: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _userSessionService: UserSessionService,
  ) {
    addIcons({mailOutline, lockClosedOutline});
  }

  public onSubmit() {
    const credentials: AuthCredentials = this.loginForm.value as AuthCredentials;
    this._userSessionService.login(credentials);
  }
}
