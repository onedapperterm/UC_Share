import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VehicleFormComponent } from '@app_components/vehicle/vehicle-form/vehicle-form.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, VehicleFormComponent]
})
export class VehiclesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
