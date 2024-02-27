import { RouterStateSerializer } from "@ngrx/router-store";
import { CoreRouterState } from "./core-router.state";
import { RouterStateSnapshot } from "@angular/router";

export class CoreRouterSerializer implements RouterStateSerializer<CoreRouterState> {
  serialize(routerState: RouterStateSnapshot): CoreRouterState {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams }, } = routerState;
    const { params } = route;

    return { url, params, queryParams };
  }
}
