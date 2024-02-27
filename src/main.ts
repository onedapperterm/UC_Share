import { enableProdMode, importProvidersFrom } from '@angular/core';
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
    provideRouterStore(
      {
        serializer: CoreRouterSerializer,
        navigationActionTiming: NavigationActionTiming.PostActivation
      }
    ),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
        }
      }),
    ),
    importProvidersFrom(CoreModule),
  ],
});

