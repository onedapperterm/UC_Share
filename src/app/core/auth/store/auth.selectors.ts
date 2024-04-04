import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, UserSession } from "../model/auth.model";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLogged = createSelector(
  selectAuthState,
  (state: AuthState): boolean => state.isLoggedIn,
);

export const selectCurrentSession= createSelector(
  selectAuthState,
  (state: AuthState): UserSession | null => state.session,
);

export const selectCurrentUserId = createSelector(
  selectCurrentSession,
  (session: UserSession | null): string | null => session ? session.uid : null,
);

//TODO:  other session selectors.
