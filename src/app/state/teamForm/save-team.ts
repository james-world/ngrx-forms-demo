import { createAction, props, On, on } from '@ngrx/store';
import { Team, State } from '../model';
import { markAsPristine } from 'ngrx-forms';

export const saveTeamAction = createAction(
  '[Team Form] Save Team',
  props<{ team: Team }>()
);

export const saveTeamReducer: On<State> = on(
  saveTeamAction,
  (state, { team }) => ({
    ...state,
    team,
    teamForm: markAsPristine(state.teamForm),
  })
);
