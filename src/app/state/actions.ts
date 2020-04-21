import { addPlayerAction } from './teamForm/add-player';
import {
  checkTeamNameAction,
  checkTeamNameFailedAction,
} from './teamForm/check-team-name';
import { removePlayerAction } from './teamForm/remove-player';
import { saveTeamAction } from './teamForm/save-team';
import { undoChangesAction } from './teamForm/undo-changes';
import { initializeTeamAction } from './teamForm/initialize-team';

export {
  addPlayerAction as addPlayer,
  checkTeamNameAction as checkTeamName,
  checkTeamNameFailedAction as checkTeamNameFailed,
  initializeTeamAction as initializeTeam,
  removePlayerAction as removePlayer,
  saveTeamAction as saveTeam,
  undoChangesAction as undoChanges,
};
