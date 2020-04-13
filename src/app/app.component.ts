import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './state/reducer';
import { Observable } from 'rxjs';
import { FormGroupState, FormArrayState, FormControlState } from 'ngrx-forms';
import * as appActions from './state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TeamBuilder';
  teamForm$: Observable<FormGroupState<fromApp.Team>>;

  constructor(private store: Store<{ app: fromApp.State }>) {
    this.teamForm$ = store.select(s => s.app.teamForm);
    store
      .select(s => s.app.teamForm.errors)
      .subscribe({
        next: v => console.log(v),
      });
  }

  addPlayer() {
    this.store.dispatch(appActions.addPlayer());
  }

  removePlayer(index: number) {
    this.store.dispatch(appActions.removePlayer({ index }));
  }

  trackByIndex(index: number) {
    return index;
  }
}
