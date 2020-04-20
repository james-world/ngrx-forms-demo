import { createAction, props, On, on, Action } from '@ngrx/store';
import { State, Team, formId } from '../model';
import {
  updateGroup,
  setAsyncError,
  SetValueAction,
  ClearAsyncErrorAction,
  StartAsyncValidationAction,
} from 'ngrx-forms';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Observable, of, concat } from 'rxjs';
import { delay, filter, switchMap } from 'rxjs/operators';

/* ACTIONS */

export const checkTeamNameAction = createAction('[Team Form] Check Team Name');
export const checkTeamNameFailedAction = createAction(
  '[Team Form] Check Team Name Failed',
  props<{ name: string }>()
);

/* REDUCERS */

export const checkTeamNameFailedReducer: On<State> = on(
  checkTeamNameFailedAction,
  (state, { name }) => {
    if (state.teamForm.controls.name.value === name) {
      const teamForm = updateGroup<Team>(state.teamForm, {
        name: setAsyncError('checkTeamName', name),
      });
      return {
        ...state,
        teamForm,
      };
    } else {
      return state;
    }
  }
);

/* EFFECTS */

const nameControlId = `${formId}.name`;

function validateNameAsync(name: string): Observable<Action> {
  const result = name.toLocaleLowerCase().includes('poo')
    ? checkTeamNameFailedAction({ name })
    : new ClearAsyncErrorAction(nameControlId, 'checkTeamName');
  return of(result).pipe(delay(3000));
}

function setValidating(): Observable<Action> {
  return of(
    new ClearAsyncErrorAction(nameControlId, 'checkTeamName'),
    new StartAsyncValidationAction(nameControlId, 'checkTeamName')
  );
}

export const checkTeamNameEffect$ = (action$: Actions) =>
  createEffect(() =>
    action$.pipe(
      ofType<SetValueAction<string>>(SetValueAction.TYPE),
      filter(setValue => setValue.controlId === nameControlId),
      switchMap(setValue =>
        concat(
          of(checkTeamNameAction()),
          setValidating(),
          validateNameAsync(setValue.value)
        )
      )
    )
  );
