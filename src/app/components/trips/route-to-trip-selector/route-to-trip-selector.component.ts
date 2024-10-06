import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { ColorThemeService } from '@app_core/services/ui-theme/color-theme.service';
import { Theme } from '@app_core/settings/model/core-settings.model';
import { UserRoutesService } from '@app_services/user-routes/user-routes.service';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { UserRoute } from 'src/app/model/route.data';

@Component({
  selector: 'app-route-to-trip-selector',
  templateUrl: './route-to-trip-selector.component.html',
  styleUrls: ['./route-to-trip-selector.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
})
export class RouteToTripSelectorComponent {

  public selectedRoute: UserRoute | null = null;
  public theme$: Observable<Theme> = this._colorThemeService.currentTheme();
  public routes$: Observable<UserRoute[] | null> = this._userRoutesService.getUserRoutes();

  constructor(
    private _modalController: ModalController,
    private _userRoutesService: UserRoutesService,
    private _colorThemeService: ColorThemeService,
  ) { }

  public cancel() {
    return this._modalController.dismiss(null, 'cancel');
  }

  public confirm() {
    return this._modalController.dismiss(this.selectedRoute, 'confirm');
  }

  public compareWith(a: UserRoute, b: UserRoute):boolean {
    return a.id === b.id;
  }

  public handleChange($event: any) {
    this.selectedRoute = $event.target.value;
  }

}
