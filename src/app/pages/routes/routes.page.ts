import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular/standalone';
import { RouteFormularComponent } from '@app_components/routes/route-formular/route-formular.component';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule]
})
export class RoutesPage implements OnInit {

  constructor(private _modalController: ModalController) { }

  ngOnInit() {
    console.log('Routes page loaded');
  }

  public async openRouteModal() {
    const modal = await this._modalController.create({
      component: RouteFormularComponent,
    });

    modal.present();
    console.log('Add new route');
  }

}
