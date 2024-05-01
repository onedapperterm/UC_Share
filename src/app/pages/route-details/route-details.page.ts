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

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.page.html',
  styleUrls: ['./route-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule, RouterLink]
})
export class RouteDetailsPage implements OnInit {

  public route$!: Observable<UserRoute>;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _modalController: ModalController,
    private _userRoutesService: UserRoutesService,
  ) { }

  ngOnInit() {
    const routeId = this._activatedRoute.snapshot.paramMap.get('id');
    if (routeId) this.route$ = this._userRoutesService.getRouteById(routeId);
    else this._router.navigate(['/routes']);
  }

  public async editRoute(route: UserRoute) {
    const modal = await this._modalController.create({
      component: RouteFormularComponent,
      componentProps: {
        route: route
      }
    });

    modal.present();
  }

  public deleteRoute(routeId: string) {
    console.log('Delete route with id:', routeId);
  }

}
