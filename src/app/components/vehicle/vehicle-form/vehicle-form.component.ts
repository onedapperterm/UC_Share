import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoreModule } from '@app_core/core.module';
import { IonicModule, ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UserSessionService } from '@app_core/auth/services/user-session.service';
import { Observable, Subscription, filter, switchMap, take } from 'rxjs';
import { CreateVehicleDto, Vehicle, VehicleType } from 'src/app/model/vehicle.data';
import { VehiclesService } from '@app_services/vehicles/vehicles.service';
import { Theme } from '@app_core/settings/model/core-settings.model';
import { ColorThemeService } from '@app_core/services/ui-theme/color-theme.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class VehicleFormComponent  implements OnInit, OnDestroy {
  @Input() public vehicle?: Vehicle;
  public mode: 'create'| 'activate' | 'edit' = 'create';
  public brands: string[] = [];
  public vehiclesTypes = ['Carro', 'Moto']
  public brandVehicles = VEHICLE_BRANDS;
  public brandsMotos = BIKE_BRANDS;

  public theme$: Observable<Theme> = this._colorThemeService.currentTheme();

  public vehicleForm = this._formBuilder.group({
    brand: ['', Validators.required],
    plates: ['', [Validators.required, Validators.pattern(/([A-Z]{3}\d{3}|[A-Z]{3}\d{2}[A-Z])/)]],
    carModel: ['', Validators.required],
    color: ['', Validators.required],
    vehicleType: ['', Validators.required],
    seats: ['', [Validators.required, Validators.pattern(/(\d{1})$/)]]
  });

  private subscription: Subscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _vehiclesService: VehiclesService,
    private _userSessionService: UserSessionService,
    private _colorThemeService: ColorThemeService,
    private _modalController: ModalController
  ) { }

  ngOnInit() {
    this.subscription.add(this.vehicleForm.get('vehicleType')?.valueChanges.subscribe(value => {
      this.loadBrands(value ? value : "");
    }));

    this.subscription.add(this.vehicleForm.get('plates')?.valueChanges.subscribe(_ => {
      this.validatePlate();
    }));

    if(this.vehicle) {
      this.vehicleForm.patchValue(this.vehicle);
    }
  }

  loadBrands(tipo: string) {

    if (tipo === 'Moto') {
      this.brands = this.brandsMotos;
      this.vehicleForm.get('seats')?.setValue('1')
    } else {
      this.brands = this.brandVehicles;
      this.vehicleForm.get('seats')?.setValue('4')
    }

    this.validatePlate();
  }

  onFocusoutPlate(){
    const placa = this.vehicleForm.get('plates')?.value;

    if(placa)
      this.vehicleForm.get('plates')?.setValue(placa.trim().toUpperCase().replace(' ', ''))
  }

  validatePlate() {
    const vehiclesType = this.vehicleForm.get('vehicleType')?.value;
    const placa = this.vehicleForm.get('plates')?.value;

    // Expresiones regulares para validar las placass
    const regexCar = /^[A-Za-z]{3}\d{3}$/; // Placa de carro: AAA 000
    const regexMoto = /^[A-Za-z]{3}\d{2}[A-Za-z]?$/; // Placa de moto: AAA 00A

    if (vehiclesType === 'Carro' && placa && !regexCar.test(placa)) {
      this.vehicleForm.get('plates')?.setErrors({ 'placaInvalida': true });
    } else if (vehiclesType === 'Moto' && placa && !regexMoto.test(placa)) {
      this.vehicleForm.get('plates')?.setErrors({ 'placaInvalida': true });
    } else {
      this.vehicleForm.get('plates')?.setErrors(null);
    }
  }

  createNewVehicle(){
    this._userSessionService.getUserId()
    .pipe(
      take(1),
      filter(userId => !!userId),
      switchMap(userId => {
        const vehicleDto: CreateVehicleDto = {
          userId: userId as string,
          brand: this.vehicleForm.value.brand as string,
          plates: this.vehicleForm.value.plates as string,
          carModel: this.vehicleForm.value.carModel as string,
          color: this.vehicleForm.value.color as string,
          vehicleType: this.vehicleForm.value.vehicleType as VehicleType,
          seats: this.vehicleForm.value.seats as string
        };

        return this._vehiclesService.createVehicle(vehicleDto)
      })
    ).subscribe(_ => this._modalController.dismiss(null, 'confirm'));
  }

  public confirm() {
    if (!this.vehicleForm.valid) return;

    if (this.mode !== 'edit') this.createNewVehicle();
  }

  public cancel() {
    return this._modalController.dismiss(null, 'cancel');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


const VEHICLE_BRANDS = [
    "Chevrolet",
      "Renault",
      "Toyota",
      "Nissan",
      "Mazda",
      "Kia",
      "Honda",
      "Hyundai",
      "Ford",
      "Volkswagen",
      "BMW",
      "Mercedes-Benz",
      "Audi",
      "Jeep",
      "Fiat",
      "Peugeot",
      "Chery",
      "Mitsubishi",
      "Subaru",
      "Suzuki",
      "Land Rover",
      "Porsche",
      "Volvo",
      "Audi",
      "Lexus",
      "Acura",
      "Great Wall",
      "Jac Motors",
      "BYD",
      "Geely"
  ]

const BIKE_BRANDS = [
    "AKT",
    "Apache",
    "Honda",
    "Yamaha",
    "Kawasaki",
    "Suzuki",
    "Bajaj",
    "KTM",
    "Harley-Davidson",
    "BMW Motorrad",
    "Ducati",
    "Vespa",
    "Piaggio",
    "Royal Enfield",
    "SYM",
    "Auteco",
    "Triumph",
    "Moto Guzzi"
  ]
