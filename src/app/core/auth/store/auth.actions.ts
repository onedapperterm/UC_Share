import { createAction, props } from '@ngrx/store';
import { AuthCredentials, LoginFailResponse, LoginSuccessResponse } from '../model/auth.model';
import { AppUser, CreateUserDto } from 'src/app/model/user.data';

export const signUpRequest = createAction(
  '[Auth] Sign Up Request',
  props<{dto: CreateUserDto}>()
);

export const signUpSuccess = createAction(
  '[Auth] Sign Up Success',
  props<{uid: string, dto: CreateUserDto}>()
);

export const saveUserData = createAction(
  '[Auth] Save User Data',
  props<{userData: AppUser}>()
);

export const signUpFailure = createAction(
  '[Auth] Sign Up Failure',
  props<LoginFailResponse>()
);

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{credentials: AuthCredentials}>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<LoginSuccessResponse>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<LoginFailResponse>()
);

export const setInitialAuthState = createAction(
  '[Auth] Set Initial Auth State',
  props<{start: boolean}>()
);

export const logout = createAction('[Auth] Logout');
