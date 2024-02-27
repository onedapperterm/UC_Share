import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoreRouterState } from "./core-router.state";

export const selectRouterState = createFeatureSelector<CoreRouterState>('router');

export const selectCoreRouterState = createSelector(
  selectRouterState,
  (state) => state
);

export const selectRouterUrl = createSelector(
  selectRouterState,
  (state) => state.url
);

