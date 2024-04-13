import { UserSession } from "@app_core/auth/model/auth.model";

export type Role = 'driver' | 'passenger';

export interface AppUser extends Omit<UserSession, 'exp'> {
  email: string;
  phoneNumber: string;
  displayName: string;
  firstName: string;
  lastName: string;
  career: string;
  roles: Role[];
  photoURL: string | null;
}

export interface CreateUserDto extends Omit<AppUser, 'uid'> {
  password: string;
}
