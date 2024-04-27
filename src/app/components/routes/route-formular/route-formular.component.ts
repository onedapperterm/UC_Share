import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorThemeService } from '@app_core/services/ui-theme/color-theme.service';
import { Theme } from '@app_core/settings/model/core-settings.model';
import { InputCustomEvent, IonicModule, ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-route-formular',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
  ],
  templateUrl: './route-formular.component.html',
  styleUrls: ['./route-formular.component.scss'],
})
export class RouteFormularComponent {

  public theme$: Observable<Theme> = this._colorThemeService.currentTheme();
  public checkpoints: WritableSignal<string[]> = signal<string[]>(['']);

  public routeForm = this._formBuilder.group({
    from: ['', Validators.required],
    neighborhood: ['', Validators.required],
    district: ['', Validators.required],
  });

  constructor(
    private _modalController: ModalController,
    private _formBuilder: FormBuilder,
    public _colorThemeService: ColorThemeService,
  ) { }

  public addCheckpoint() {
    this.checkpoints.update(current => [...current, '']);
  }

  public removeCheckpoint(index: number) {
    this.checkpoints.update(current => current.filter((_, i) => i !== index));
  }

  public updateCheckpoint(event: InputCustomEvent, index: number) {
    const value = event.target.value || '';
    let current = this.checkpoints();
    current.splice(index, 1, value as string);
    this.checkpoints.set(current);
  }

  public cancel() {
    return this._modalController.dismiss(null, 'cancel');
  }

  public confirm() {
    return this._modalController.dismiss(null, 'confirm');
  }
}
