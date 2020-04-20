import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { State } from './model';
import { checkTeamNameEffect$ } from './teamForm/checkTeamName';

@Injectable()
export class AppEffects {
  constructor(private action$: Actions, private store: Store<State>) {}

  checkTeamName$ = checkTeamNameEffect$(this.action$);
}
