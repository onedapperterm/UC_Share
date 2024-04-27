export interface UserRoute {
  id: string;
  userId: string;
  district: string;
  neighborhood: string;
  from: DepartureLocation;
  checkpoints: string[];
  status: 'active' | 'inactive';
  comments?: string;
  sunday?: Date | null;
  monday?: Date | null;
  tuesday?: Date | null;
  wednesday?: Date | null;
  thursday?: Date | null;
  friday?: Date | null;
  saturday?: Date | null;
}

export type DepartureLocation = 'central' | 'norte' | 'candelaria';
