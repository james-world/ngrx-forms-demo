import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromApp from './state/reducer';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import * as appActions from './state/actions';
import * as appSelectors from './state/selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Team } from './state/reducer';

@Component({
  selector: 'tb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TeamBuilder';
  teamForm$: Observable<FormGroupState<fromApp.Team>>;
  team$: Observable<Team>;

  constructor(
    private store: Store<{ app: fromApp.State }>,
    private snackBar: MatSnackBar
  ) {
    this.teamForm$ = this.store.pipe(select(appSelectors.selectTeamForm));
    this.team$ = this.store.pipe(select(appSelectors.selectTeam));

    this.store.pipe(select(appSelectors.selectSubsRemaining)).subscribe({
      next: v => {
        if (v < 0) {
          snackBar.open(`There are ${-v} too many subs selected!`, null, {
            panelClass: 'tf-center',
          });
        } else {
          snackBar.dismiss();
        }
      },
    });
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

  trackByIndex(index: number) {
    return index;
  }
}
