import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../state/reducer';
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
  teamForm$: Observable<FormGroupState<fromApp.Team>>;
  team$: Observable<fromApp.Team>;
  subCount$: Observable<number>;

  constructor(private store: Store<{ app: fromApp.State }>) {}

  ngOnInit() {
    this.teamForm$ = this.store.pipe(select(appSelectors.selectTeamForm));
    this.team$ = this.store.pipe(select(appSelectors.selectTeam));
    this.subCount$ = this.store.pipe(select(appSelectors.selectSubCount));
  }

  addPlayer() {
    this.store.dispatch(appActions.addPlayer());
  }

  saveTeam(team: fromApp.Team) {
    this.store.dispatch(appActions.saveTeam({ team }));
  }

  removePlayer(index: number) {
    this.store.dispatch(appActions.removePlayer({ index }));
  }

  trackByIndex(index: number) {
    return index;
  }
}
