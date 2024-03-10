import { Component, OnInit } from '@angular/core';
import { setUser } from '@app_core/auth/store/auth.actions';
import { CoreModule } from '@app_core/core.module';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, CoreModule, TranslateModule],
})
export class AppComponent implements OnInit{

  constructor(
    private store: Store,
    private TranslateService: TranslateService,
  ) {
  }

  ngOnInit() {
    this.TranslateService.use('en');
    this.store.dispatch(setUser({start: true}));

    this.store.subscribe((state) => {
      console.log('store:', state);
    });
  }
}
