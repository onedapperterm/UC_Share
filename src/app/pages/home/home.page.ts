import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { UserSession } from '@app_core/auth/model/auth.model';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonTabButton, IonIcon, IonButton } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonButton,
    IonTabButton,
    AsyncPipe
  ],
})
export class HomePage {

  public user$: Observable<UserSession | null> = this._userSessionService.getSession();

  constructor(private _userSessionService: UserSessionService) {}

  public logout(): void {
    this._userSessionService.logout();
  }
}
