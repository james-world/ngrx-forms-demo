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
import { filter, switchMap, map, debounceTime, pluck } from 'rxjs/operators';
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

/* Effects listen to the stream of actions (action$) being dispatch to the store
 * and augment that stream with additional actions.
 *
 * NB: The action stream passed in is
 * timed such that the reducers have already run and the store is updated.
 *
 * In this effect, we are listening for the ngrx-forms SetValueAction
 * sent to update the team name control, and when this happens we will
 * use a service to asynchronously validate that the team name doesn't
 * contain expletives, and notify the store with actions of the result.
 *
 * NB: The SetValueAction is additionally processed by the checkTeamNameReducer
 * above to clear any previous checkTeamName asynchronous validation state and
 * mark the control as validationPending.
 *
 * The effect works as follows:
 * - Filter for the action type of SetValueAction using the ofType operator
 *
 * - Filter futher for the payload of this action carrying the controlId of the
 *   name control
 *
 * - Debounce by 1 sec; basically, wait for a clear second without updates to the
 *   control before calling the validation service. This avoids overburdening the
 *   server with network calls on every press of the keyboard
 *
 * - Pluck out the team name to validate
 *   (the value property of the object passed as the SetValueAction payload)
 *
 * - The argument to switchMap is a function that accepts a team name and returns
 *   a stream that will emit the action required to update the store with the result
 *   of the validation. So this is an example of a higher-order stream. Our name event
 *   is being projected into a stream itself. So we have a stream of streams.
 *   SwitchMap then flattens this stream of streams by emitting events from each new
 *   validation stream thats starts until the next validation stream starts.
 *   In this way, if one validation starts before the preceeding one has finished,
 *   the now irrelevant results from the unfinished stream will be dumped.
 *
 *   The helper function validationResultToAction transforms the result of the validation
 *   service call into either a checkTeamNameFailedAction (whose reducer above sets the
 *   appropriate error on the control), or the ngrx-forms ClearAsyncErrorAction which removes
 *   the pending async validation status on the control and clears any previous error.
 */

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
      pluck('value'),
      switchMap(value =>
        validationService.checkName(value).pipe(map(validationResultToAction))
      )
    )
  );
