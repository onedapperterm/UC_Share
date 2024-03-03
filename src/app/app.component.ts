import { Component, OnInit } from '@angular/core';
import { CoreModule } from '@app_core/core.module';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, CoreModule, TranslateModule],
})
export class AppComponent implements OnInit{

  constructor(private TranslateService: TranslateService) {}

  ngOnInit() {
    this.TranslateService.use('en');
  }
}
