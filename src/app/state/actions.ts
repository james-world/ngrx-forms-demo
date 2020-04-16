import { createAction, props } from '@ngrx/store';
import { Team } from './reducer';

export const addPlayer = createAction('[Team Form] Add Player');
export const removePlayer = createAction(
  '[Team Form] Remove Player',
  props<{ index: number }>()
);
export const saveTeam = createAction(
  '[Team Form] Save Team',
  props<{ team: Team }>()
);
export const initializeTeam = createAction(
  '[Team Form] Initialize Team',
  props<{ size: number }>()
);
export const checkTeamName = createAction('[Team Form] Check Team Name');
export const undoChanges = createAction('[Team Form] Undo Changes');
