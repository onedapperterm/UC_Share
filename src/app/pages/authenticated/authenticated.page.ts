import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.page.html',
  styleUrls: ['./authenticated.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    IonRouterOutlet,
    TranslateModule,
  ]
})
export class AuthenticatedPage {

  public isDriver$: Observable<boolean> = this._userSessionService.hasRole('driver');

  constructor(private _userSessionService: UserSessionService) { }

}
