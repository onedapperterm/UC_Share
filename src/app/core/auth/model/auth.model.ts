import { HttpErrorResponse } from "@angular/common/http";
import { UserSession } from "./user.model";

export interface AuthCredentials {
  emailAddress: string;
  password: string;
}

export interface AuthState {
  session: UserSession | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  authError?: string;
}

export interface StoredAuthState extends Omit<AuthState, 'session' | 'isLoggedIn' | 'isLoading' | 'authError'> {}

export interface LoginResponse {
  accessToken?: string;
  refreshToken?: string;
  error?: any;
  message?: string;
}

export interface LoginSuccessResponse extends Omit<LoginResponse, 'error' | 'message'> {
  accessToken: string;
  refreshToken: string;
  session: UserSession;
}

export interface LoginFailResponse extends Omit<LoginResponse, 'accessToken' | 'refreshToken'> {
  error?: HttpErrorResponse | Error;
  message?: string;
  translationKey?: string;
}

export interface DecodedAccessToken {
  userId: number;
  roleIds: number[];
  customerId: number;
  privileges: string[];
  organisationId: number;
  sub: string;
  exp: number;
  iat: number;
}
