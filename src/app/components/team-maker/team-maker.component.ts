import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/model';
import * as appActions from 'src/app/state/actions';

@Component({
  selector: 'tb-team-maker',
  templateUrl: './team-maker.component.html',
  styleUrls: ['./team-maker.component.scss'],
})
export class TeamMakerComponent {
  numPlayers = 10;

  constructor(private store: Store<State>) {}

  initializeTeam() {
    this.store.dispatch(appActions.initializeTeam({ size: this.numPlayers }));
  }
}
