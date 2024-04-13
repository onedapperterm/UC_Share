import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { UserSession } from '@app_core/auth/model/auth.model';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    AsyncPipe
  ],
})
export class HomePage {

  public user$: Observable<UserSession | null> = this._userSessionService.getSession();

  constructor(private _userSessionService: UserSessionService) {}

}
