import { State, formId } from '../model/state';
import { on, On, createAction } from '@ngrx/store';
import { Team } from '../model';
import { createFormGroupState } from 'ngrx-forms';

export const undoChangesAction = createAction('[Team Form] Undo Changes');

export const undoChangesReducer: On<State> = on(undoChangesAction, state => {
  const s = state as State;
  return {
    ...s,
    teamForm: createFormGroupState<Team>(formId, s.team),
  };
});
