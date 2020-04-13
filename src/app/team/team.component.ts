import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { Team } from '../state/reducer';

@Component({
  selector: 'tb-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  @Input() team: FormGroupState<Team>;
  @Output() addPlayer = new EventEmitter<void>();
  @Output() removePlayer = new EventEmitter<number>();
  @Output() saveTeam = new EventEmitter<Team>();

  trackByIndex(index: number) {
    return index;
  }
}
