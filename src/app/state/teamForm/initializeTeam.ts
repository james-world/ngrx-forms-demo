import { createAction, props, On, on } from '@ngrx/store';
import { State, formId, Team, createTeam } from '../model';
import { createFormGroupState } from 'ngrx-forms';

export const initializeTeamAction = createAction(
  '[Team Form] Initialize Team',
  props<{ size: number }>()
);

export const initializeTeamReducer: On<State> = on(
  initializeTeamAction,
  (state, { size }) => {
    const team = createTeam(size);
    const teamForm = createFormGroupState<Team>(formId, team);

    return {
      ...state,
      team,
      teamForm,
    };
  }
);
