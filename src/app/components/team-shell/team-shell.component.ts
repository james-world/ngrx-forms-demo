import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Team, State } from '../../state/model';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import * as appActions from '../../state/actions';
import * as appSelectors from '../../state/selectors';

@Component({
  selector: 'tb-team-shell',
  templateUrl: './team-shell.component.html',
  styleUrls: ['./team-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamShellComponent implements OnInit {
  teamForm$: Observable<FormGroupState<Team>>;
  team$: Observable<Team>;
  subCount$: Observable<number>;

  constructor(private store: Store<{ app: State }>) {}

  ngOnInit() {
    this.teamForm$ = this.store.pipe(select(appSelectors.selectTeamForm));
    this.team$ = this.store.pipe(select(appSelectors.selectTeam));
    this.subCount$ = this.store.pipe(select(appSelectors.selectSubCount));
  }

  addPlayer() {
    this.store.dispatch(appActions.addPlayer());
  }

  saveTeam(team: Team) {
    this.store.dispatch(appActions.saveTeam({ team }));
  }

  removePlayer(index: number) {
    this.store.dispatch(appActions.removePlayer({ index }));
  }

  undoChanges() {
    this.store.dispatch(appActions.undoChanges());
  }

  trackByIndex(index: number) {
    return index;
  }
}
