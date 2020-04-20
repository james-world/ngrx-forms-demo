import { createAction, props, On, on } from '@ngrx/store';
import { State, Team } from '../model';
import { removeArrayControl, updateGroup } from 'ngrx-forms';

export const removePlayerAction = createAction(
  '[Team Form] Remove Player',
  props<{ index: number }>()
);

export const removePlayerReducer: On<State> = on(
  removePlayerAction,
  (state, { index }) => {
    const removePlayer = removeArrayControl(index);
    const updateForm = updateGroup<Team>({
      players: removePlayer,
    });
    return { ...state, teamForm: updateForm(state.teamForm) };
  }
);
