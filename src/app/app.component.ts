import { Component, OnInit } from '@angular/core';
import { setInitialAuthState } from '@app_core/auth/store/auth.actions';
import { CoreModule } from '@app_core/core.module';
import { ColorThemeService } from '@app_core/services/ui-theme/color-theme.service';
import { selectCurrentTheme } from '@app_core/settings/store/settings.selectors';
import { IonApp, IonLoading, IonRouterOutlet } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    IonLoading,
    CoreModule,
    TranslateModule,
  ],
})
export class AppComponent implements OnInit{

  constructor(
    private _store: Store,
    private _translateService: TranslateService,
    private _colorThemeService: ColorThemeService,
  ) {
  }

  ngOnInit() {
    this._translateService.use('en');
    this._store.dispatch(setInitialAuthState({start: true}));
    this._store.select(selectCurrentTheme).pipe(take(1)).subscribe(theme => this._colorThemeService.setTheme(theme));
  }

}
