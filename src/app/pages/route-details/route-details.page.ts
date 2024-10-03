import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserRoutesService } from '@app_services/user-routes/user-routes.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRoute } from 'src/app/model/route.data';
import { TranslateModule } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular/standalone';
import { RouteFormularComponent } from '@app_components/routes/route-formular/route-formular.component';
import { ColorThemeService } from '@app_core/services/ui-theme/color-theme.service';
import { Theme } from '@app_core/settings/model/core-settings.model';
import { TripFormularComponent } from '@app_components/trips/trip-formular/trip-formular.component';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.page.html',
  styleUrls: ['./route-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule, RouterLink]
})
export class RouteDetailsPage implements OnInit {

  public route$!: Observable<UserRoute>;
  public theme$: Observable<Theme> = this._colorThemeService.currentTheme();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _modalController: ModalController,
    private _userRoutesService: UserRoutesService,
    private _colorThemeService: ColorThemeService,
  ) { }

  ngOnInit() {
    const routeId = this._activatedRoute.snapshot.paramMap.get('id');
    if (routeId) this.route$ = this._userRoutesService.getRouteById(routeId);
    else this._router.navigate(['/routes']);
  }

  public async activateRoute(route: UserRoute): Promise<void> {
    const modal = await this._modalController.create({
      component: TripFormularComponent,
      componentProps: {
        route: route
      }
    });

    modal.present();

    modal.onDidDismiss().then(() => {
      //update trip
      console.log('dismissed')
    });
  }

  public async editRoute(route: UserRoute): Promise<void> {
    const modal = await this._modalController.create({
      component: RouteFormularComponent,
      componentProps: {
        route: route
      }
    });

    modal.present();

    modal.onDidDismiss().then(() => {
      this.route$ = this._userRoutesService.getRouteById(route.id);
    });
  }

  public deleteRoute(routeId: string): void {
    this._userRoutesService.deleteRoute(routeId).subscribe(_ => this._router.navigate(['/routes']));
  }


}
