import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroupState, FormArrayState } from 'ngrx-forms';
import { Team, Player } from '../../state/reducer';

@Component({
  selector: 'tb-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {
  @Input() team: FormGroupState<Team>;
  @Input() subCount: number;
  @Output() addPlayer = new EventEmitter<void>();
  @Output() removePlayer = new EventEmitter<number>();
  @Output() saveTeam = new EventEmitter<Team>();

  show = false;

  public get players(): readonly FormGroupState<Player>[] {
    if (this.show) {
      return this.team.controls.players.controls.slice(0, 10);
    } else {
      return this.team.controls.players.controls;
    }
  }

  trackByIndex(index: number) {
    return index;
  }
}
