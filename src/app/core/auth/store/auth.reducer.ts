import { Action, createReducer, on } from "@ngrx/store";
import { AuthState, LoginFailResponse, LoginSuccessResponse } from "../model/auth.model";
import { setUser, loginFailure, loginRequest, loginSuccess, logout } from "./auth.actions";

export const initialAuthState: AuthState = {
  session: null,
  isLoggedIn: false,
  isLoading: false,
}

const _authReducer = createReducer(
  initialAuthState,
  on(setUser, (state: AuthState) => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(loginRequest, (state: AuthState) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(loginSuccess, (state: AuthState, response: LoginSuccessResponse ) => {
    return {
      ...state,
      session: response.session,
      isLoggedIn: true,
      isLoading: false
    };
  }),
  on(loginFailure, (state: AuthState, response: LoginFailResponse ) => {
    return {
      ...state,
      session: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      isLoading: false,
      authError: response.message
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      session: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      isLoading: false,
      authError: undefined
    }
  }),
);

export function authReducer(state: AuthState | undefined, action: Action):AuthState {
  return _authReducer(state, action);
}
