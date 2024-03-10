export interface UserSession {
  uid: string;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  exp: number;
  firstName?: string;
  lastName?: string;
}
