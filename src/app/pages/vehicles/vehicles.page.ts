import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VehicleFormComponent } from '@app_components/vehicle/vehicle-form/vehicle-form.component'
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/model/vehicle.data';
import { VehiclesService } from '@app_services/vehicles/vehicles.service';
import { TranslateModule } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule ],
})
export class VehiclesPage {
  public vehicles$: Observable<Vehicle[]> = this._vehiclesService.getUserVehicles();

  public deleteButtons = [
    {
      text: 'Eliminar Vehiculo',
      role: 'confirm',
    },
    {
      text: 'Mejor no',
      role: 'cancel',
    },
  ]

  constructor(
    private _vehiclesService: VehiclesService,
    private _modalController: ModalController,
  ) {}

  public async openVehicleModal(vehicle?: Vehicle) {
    const modal = await this._modalController.create({
      component: VehicleFormComponent,
      componentProps: { vehicle }
    });

    modal.present();

    modal.onDidDismiss().then(result => {
      console.log(result)
    });
  }

  public onDeleteSheetDismiss($event: any, vehicle: Vehicle): void {
    if($event.detail.role === 'confirm') {
      this._vehiclesService.deleteVehicle(vehicle.id).subscribe();
    }
  }
}
