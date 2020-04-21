import { createAction, props, On, on, Action } from '@ngrx/store';
import { State, Team, formId } from '../model';
import {
  updateGroup,
  setAsyncError,
  SetValueAction,
  ClearAsyncErrorAction,
  onNgrxFormsAction,
  clearAsyncError,
  startAsyncValidation,
} from 'ngrx-forms';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { filter, switchMap, map, debounceTime } from 'rxjs/operators';
import {
  ValidationService,
  ValidationResult,
} from 'src/app/validation.service';

const nameControlId = `${formId}.name`;

/* ACTIONS */

export const checkTeamNameAction = createAction('[Team Form] Check Team Name');
export const checkTeamNameFailedAction = createAction(
  '[Team Form] Check Team Name Failed',
  props<{ name: string }>()
);

/* REDUCERS */

export const checkTeamNameReducer: On<State> = onNgrxFormsAction(
  SetValueAction,
  (state, action) => {
    if (action.controlId === nameControlId) {
      const clearTeamNameAsyncErrors = updateGroup<Team>(
        {
          name: clearAsyncError('checkTeamName'),
        },
        {
          name: startAsyncValidation('checkTeamName'),
        }
      );

      return { ...state, teamForm: clearTeamNameAsyncErrors(state.teamForm) };
    } else {
      return state;
    }
  }
);

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

function validationResultToAction(result: ValidationResult): Action {
  if (result.expletive) {
    return checkTeamNameFailedAction({ name: result.name });
  } else {
    return new ClearAsyncErrorAction(nameControlId, 'checkTeamName');
  }
}

export const checkTeamNameEffect$ = (
  action$: Actions,
  validationService: ValidationService
) =>
  createEffect(() =>
    action$.pipe(
      ofType<SetValueAction<string>>(SetValueAction.TYPE),
      filter(setValue => setValue.controlId === nameControlId),
      debounceTime(1000), // Only trigger validation call if there's been no changes for a second
      switchMap(setValue =>
        validationService
          .checkName(setValue.value)
          .pipe(map(validationResultToAction))
      )
    )
  );
