import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ColorThemeService } from '@app_core/services/ui-theme/color-theme.service';

describe('AppComponent', () => {
  it('should create the app', () => {
    let translateService = jasmine.createSpyObj('TranslateService', ['']);
    let colorThemeService = jasmine.createSpyObj('ColorThemeService', ['']);

    TestBed.overrideComponent(AppComponent, {
      add: {
        imports: [
          RouterTestingModule,
          AppComponent,
          TranslateModule,
          //IonicModule,
          CommonModule,
          RouterTestingModule,
        ],
        providers: [
          provideMockStore({}),
          { provide: TranslateService, useValue: translateService},
          { provide: ColorThemeService, useValue: colorThemeService}
        ],
      }
    });
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
