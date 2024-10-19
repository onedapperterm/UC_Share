import { CommonModule } from '@angular/common';
import { Component, Input, } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-trip-checkpoints',
  templateUrl: './trip-checkpoints.component.html',
  styleUrls: ['./trip-checkpoints.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
  ],
})
export class TripCheckpointsComponent {
  @Input() checkpoints: string[] = [''];
  @Input() from: string = '';
  @Input() neighborhood: string = '';

  constructor() { }

}
