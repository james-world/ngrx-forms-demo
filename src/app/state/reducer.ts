import { createReducer } from '@ngrx/store';
import {
  createFormGroupState,
  onNgrxForms,
  wrapReducerWithFormStateUpdate,
} from 'ngrx-forms';
import { Team, State, formId, createTeam } from './model';

import { addPlayerReducer } from './teamForm/add-player';
import { undoChangesReducer } from './teamForm/undo-changes';
import { saveTeamReducer } from './teamForm/save-team';
import { removePlayerReducer } from './teamForm/remove-player';
import {
  checkTeamNameFailedReducer,
  checkTeamNameReducer,
} from './teamForm/check-team-name';
import { initializeTeamReducer } from './teamForm/initialize-team';
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
  checkTeamNameReducer,
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
