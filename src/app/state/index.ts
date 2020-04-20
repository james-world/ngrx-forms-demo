import { addPlayerAction } from './teamForm/addPlayer';
import {
  checkTeamNameAction,
  checkTeamNameFailedAction,
} from './teamForm/checkTeamName';
import { removePlayerAction } from './teamForm/removePlayer';
import { saveTeamAction } from './teamForm/saveTeam';
import { undoChangesAction } from './teamForm/undoChanges';
import { initializeTeamAction } from './teamForm/initializeTeam';

export const actions = {
  addPlayer: addPlayerAction,
  checkTeamName: checkTeamNameAction,
  checkTeamNameFailed: checkTeamNameFailedAction,
  initializeTeam: initializeTeamAction,
  removePlayer: removePlayerAction,
  saveTeam: saveTeamAction,
  undoChanges: undoChangesAction,
};
