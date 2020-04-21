import { addPlayerAction } from './teamForm/add-player';
import {
  checkTeamNameAction,
  checkTeamNameFailedAction,
} from './teamForm/check-team-name';
import { removePlayerAction } from './teamForm/remove-player';
import { saveTeamAction } from './teamForm/save-team';
import { undoChangesAction } from './teamForm/undo-changes';
import { initializeTeamAction } from './teamForm/initialize-team';

export const actions = {
  addPlayer: addPlayerAction,
  checkTeamName: checkTeamNameAction,
  checkTeamNameFailed: checkTeamNameFailedAction,
  initializeTeam: initializeTeamAction,
  removePlayer: removePlayerAction,
  saveTeam: saveTeamAction,
  undoChanges: undoChangesAction,
};
