import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { VehiclesService } from '@app_services/vehicles/vehicles.service';
import { IonicModule } from '@ionic/angular';
import { Vehicle } from 'src/app/model/vehicle.data';
import { Observable } from 'rxjs'


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class VehicleListComponent  implements OnInit {
  public vehicles$: Observable<Vehicle[]> = this._vehiclesService.getUserVehicles();

  constructor(
    private _vehiclesService: VehiclesService
  ) { 
  }

  ngOnInit() {
  }

}
