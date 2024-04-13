import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable, take } from 'rxjs';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { AppUser } from 'src/app/model/user.data';
import { LocalizationService } from '@app_core/services/localization/localization.service';
import { Language, Theme } from '@app_core/settings/model/core-settings.model';
import { ColorThemeService } from '@app_core/services/ui-theme/color-theme.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule]
})
export class AccountPage implements OnInit {

  public user$: Observable<AppUser | null> = this._userSessionService.getCurrentUserData();
  public language: Language = this._localizationService.getCurrentLanguage();
  public darkTheme!: boolean;

  constructor(
    private _userSessionService: UserSessionService,
    private _localizationService: LocalizationService,
    private _colorThemeService: ColorThemeService,
  ) {}

  ngOnInit() {
    this._colorThemeService.currentTheme()
      .pipe(take(1))
      .subscribe((theme: Theme) =>  this.darkTheme = theme === 'dark');
  }

  public logout(): void {
    this._userSessionService.logout();
  }

  public onLanguageSelect():void {
    this._localizationService.updateLanguage(this.language);
  }

  public onThemeSelect(): void {
    const theme = this.darkTheme ? 'dark' : 'light';
    this._colorThemeService.setTheme(theme);
  }
}
