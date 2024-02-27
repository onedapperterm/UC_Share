import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../model/auth.model";
import { SystemPrivilege, UserSession } from "../model/user.model";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAccessToken = createSelector(
  selectAuthState,
  (state: AuthState): string | null => state.accessToken,
);

export const selectRefreshToken = createSelector(
  selectAuthState,
  (state: AuthState): string | null => state.refreshToken,
);

export const selectIsLogged = createSelector(
  selectAuthState,
  (state: AuthState): boolean => state.isLoggedIn,
);

export const selectCurrentSession= createSelector(
  selectAuthState,
  (state: AuthState): UserSession | null => state.session,
);

export const selectSessionPrivileges = createSelector(
  selectCurrentSession,
  (session: UserSession | null): SystemPrivilege[] => session ? session.privileges : [],
);

export const selectCurrentUserId = createSelector(
  selectCurrentSession,
  (session: UserSession | null): number | null => session ? session.id : null,
);

//TODO:  other session selectors.
