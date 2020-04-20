import { createReducer } from '@ngrx/store';
import {
  createFormGroupState,
  onNgrxForms,
  wrapReducerWithFormStateUpdate,
} from 'ngrx-forms';
import { Team, State, formId, createTeam } from './model';

import { addPlayerReducer } from './teamForm/addPlayer';
import { undoChangesReducer } from './teamForm/undoChanges';
import { saveTeamReducer } from './teamForm/saveTeam';
import { removePlayerReducer } from './teamForm/removePlayer';
import { checkTeamNameFailedReducer } from './teamForm/checkTeamName';
import { initializeTeamReducer } from './teamForm/initializeTeam';
import { validateTeamForm } from './teamForm/validation';

const initialTeam: Team = createTeam(5);
const initialFormState = createFormGroupState<Team>(formId, initialTeam);

const initialState: State = {
  teamForm: initialFormState,
  team: initialTeam,
};

export const rawReducer = createReducer(
  initialState,
  onNgrxForms(),
  addPlayerReducer,
  checkTeamNameFailedReducer,
  removePlayerReducer,
  saveTeamReducer,
  initializeTeamReducer,
  undoChangesReducer
);

export const reducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  s => s.teamForm,
  validateTeamForm
);
