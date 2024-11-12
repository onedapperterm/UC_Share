export interface Vehicle {
  id: string;
  userId: string;
  brand: string;
  plates: string;
  carModel: string;
  color: string;
  vehicleType: string;
  seats: string;
}

export interface CreateVehicleDto extends Omit<Vehicle, 'id'> {}
