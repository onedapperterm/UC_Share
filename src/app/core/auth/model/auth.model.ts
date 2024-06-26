import { HttpErrorResponse } from "@angular/common/http";
import { OperationType, User } from "firebase/auth";
import { Role } from "src/app/model/user.data";

export interface AuthCredentials {
  emailAddress: string;
  password: string;
}

export interface AuthState {
  session: UserSession | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  authError?: string;
}

//TODO: Julian of the future, fix this f***ing mess, this thing is like a f***ing Frankenstein monster
export interface UserSession {
  uid: string;
  email: string | null;
  phoneNumber: string | null;
  displayName?: string | null;
  photoURL: string | null;
  roles: Role[];
  exp?: number;
}

export interface LoginResponse {
  error?: any;
  message?: string;
  user?: User;
  providerId?: string | null;
  operationType?: (typeof OperationType)[keyof typeof OperationType];
}

export interface LoginSuccessResponse extends Omit<LoginResponse, 'error' | 'message'> {
  session: UserSession;
}

export interface LoginFailResponse extends Omit<LoginResponse, 'accessToken' | 'refreshToken'> {
  error?: HttpErrorResponse | Error;
  message?: string;
  translationKey?: string;
}

export interface FirebaseUserResponse {
  user: {
    uid: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    createdAt: string;
    lastLoginAt: string;
    apiKey: string;
    appName: string;
    stsTokenManager: {
      refreshToken: string;
      accessToken: string;
      expirationTime: number;
    };
    providerData: {
      providerId: string;
      uid: string;
      displayName: string | null;
      email: string;
      phoneNumber: string | null;
      photoURL: string | null;
    }[];
  };
  providerId?: null | string;
  _tokenResponse: {
    kind: string;
    localId: string;
    email: string;
    displayName: string;
    idToken: string;
    registered: boolean;
    refreshToken: string;
    expiresIn: string;
  };
  operationType?: string;
}

