export type VehicleType = 'carro' | 'moto';

export interface Vehicle {
  id: string;
  userId: string;
  brand: string;
  plates: string;
  carModel: string;
  color: string;
  vehicleType: VehicleType;
  seats: string;
}

export interface CreateVehicleDto extends Omit<Vehicle, 'id'> {}
