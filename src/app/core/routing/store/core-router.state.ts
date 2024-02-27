import { Params } from '@angular/router';

export interface CoreRouterState {
  url: string;
  params?: Params;
  queryParams?: Params;
}
