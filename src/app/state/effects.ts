import { Injectable } from '@angular/core';

import { concat, of, Observable } from 'rxjs';
import { switchMap, delay, filter } from 'rxjs/operators';

import { Action, Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  StartAsyncValidationAction,
  SetAsyncErrorAction,
  ClearAsyncErrorAction,
  SetValueAction,
} from 'ngrx-forms';
import * as appActions from './actions';

import { formId, State } from './reducer';

const nameControlId = `${formId}.name`;

function validateNameAsync(name: string): Observable<Action> {
  const result = name.toLocaleLowerCase().includes('poo')
    ? appActions.checkTeamNameFailed({ name })
    : new ClearAsyncErrorAction(nameControlId, 'checkTeamName');
  return of(result).pipe(delay(3000));
}

function setValidating(): Observable<Action> {
  return of(
    new ClearAsyncErrorAction(nameControlId, 'checkTeamName'),
    new StartAsyncValidationAction(nameControlId, 'checkTeamName')
  );
}

@Injectable()
export class AppEffects {
  constructor(private action$: Actions, private store: Store<State>) {}

  checkTeamName$ = createEffect(() =>
    this.action$.pipe(
      ofType<SetValueAction<string>>(SetValueAction.TYPE),
      filter(setValue => setValue.controlId === nameControlId),
      switchMap(setValue =>
        concat(
          of(appActions.checkTeamName()),
          setValidating(),
          validateNameAsync(setValue.value)
        )
      )
    )
  );
}
