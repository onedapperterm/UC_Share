import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { coreEffects, coreReducers, metaReducers } from './app/core/store/core.state';
import { NavigationActionTiming, provideRouterStore } from '@ngrx/router-store';
import { CoreRouterSerializer } from './app/core/routing/store/router-state.serializer';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { httpLoaderFactory } from './app/core/i18n/http-loader-factory';
import { CoreModule } from './app/core/core.module';
import { provideStoreDevtools } from '@ngrx/store-devtools';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(coreReducers, {metaReducers}),
    provideEffects(coreEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75,
      connectInZone: true
    }),
    provideRouterStore(
      {
        serializer: CoreRouterSerializer,
        navigationActionTiming: NavigationActionTiming.PostActivation
      }
    ),
    importProvidersFrom([
      CoreModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
        }
      }),
    ]),
  ],
});

