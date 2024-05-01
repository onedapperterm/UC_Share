import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular/standalone';
import { RouteFormularComponent } from '@app_components/routes/route-formular/route-formular.component';
import { UserRoutesService } from '@app_services/user-routes/user-routes.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule, RouterLink]
})
export class RoutesPage {

  public userRoutes$ = this._userRoutesService.getUserRoutes();

  constructor(
    private _modalController: ModalController,
    private _userRoutesService: UserRoutesService
  ) { }

  public async openRouteModal() {
    const modal = await this._modalController.create({
      component: RouteFormularComponent,
    });

    modal.present();
  }

}
