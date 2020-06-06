import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Team, State } from '../../state/model';
import { Observable, combineLatest } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import * as actions from '../../state/actions';
import * as appSelectors from '../../state/selectors';
import * as rfc6902 from 'rfc6902';
import { map } from 'rxjs/operators';

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
  teamChanges$: Observable<object[]>;

  constructor(private store: Store<{ app: State }>) {}

  ngOnInit() {
    this.teamForm$ = this.store.pipe(select(appSelectors.selectTeamForm));
    this.team$ = this.store.pipe(select(appSelectors.selectTeam));
    this.subCount$ = this.store.pipe(select(appSelectors.selectSubCount));
    this.teamChanges$ = combineLatest([this.teamForm$, this.team$]).pipe(
      map(([tf, t]) => rfc6902.createPatch(t, tf.value))
    );
  }

  addPlayer() {
    this.store.dispatch(actions.addPlayer());
  }

  saveTeam(team: Team) {
    this.store.dispatch(actions.saveTeam({ team }));
  }

  removePlayer(index: number) {
    this.store.dispatch(actions.removePlayer({ index }));
  }

  undoChanges() {
    this.store.dispatch(actions.undoChanges());
  }
}
