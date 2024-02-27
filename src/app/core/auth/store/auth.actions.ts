import { createAction, props } from '@ngrx/store';
import { AuthCredentials, LoginFailResponse, LoginSuccessResponse } from '../model/auth.model';

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

export const logout = createAction('[Auth] Logout');
