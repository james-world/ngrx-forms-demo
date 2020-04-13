import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './reducer';
import { isNumber } from 'util';

export interface AppState {
  app: State;
}

export const selectApp = createFeatureSelector<State>('app');

export const selectTeamForm = createSelector(
  selectApp,
  state => state.teamForm
);

const selectPlayers = createSelector(
  selectApp,
  state => state.teamForm.value.players
);

export const selectSubCount = createSelector(selectPlayers, players => {
  return players.reduce((prev, curr) => (curr.isSub ? prev + 1 : prev), 0);
});

const selectMaxSubs = createSelector(selectTeamForm, team =>
  team.controls.maxSubs.value >= 0 ? team.value.maxSubs : null
);

export const selectSubsRemaining = createSelector(
  selectSubCount,
  selectMaxSubs,
  (subCount, maxSubs) => {
    if (subCount === null || maxSubs === null) {
      return null;
    } else {
      return maxSubs - subCount;
    }
  }
);

export const selectTeam = createSelector(selectApp, state => state.team);
