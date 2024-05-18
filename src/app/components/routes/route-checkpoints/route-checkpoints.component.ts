import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, WritableSignal, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputCustomEvent, IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-route-checkpoints',
  templateUrl: './route-checkpoints.component.html',
  styleUrls: ['./route-checkpoints.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class RouteCheckpointsComponent  implements OnInit {
  @Input() initialCheckpoints: string[] = [''];
  @Input() disabled: boolean = false;
  @Input() from: string = '';
  @Input() neighborhood: string = '';

  public checkpoints: WritableSignal<string[]> = signal<string[]>(['']);

  @Output() checkpointsChange = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {}

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
}
