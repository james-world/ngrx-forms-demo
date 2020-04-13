import { createAction, props } from '@ngrx/store';

export const addPlayer = createAction('[Team Form] Add Player');
export const removePlayer = createAction(
  '[Team Form] Remove Player',
  props<{ index: number }>()
);
