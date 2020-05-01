import {
  createSelector,
  createFeatureSelector,
  createSelectorFactory,
  defaultMemoize,
} from '@ngrx/store';
import { State, Player } from './model';

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

export function checkEqual(a, b) {
  return (
    a && b && a.length === b.length && a.every((val, idx) => val === b[idx])
  );
}

export const selectSubs = createSelectorFactory(projector =>
  defaultMemoize(projector, undefined, checkEqual)
)(selectPlayers, (players: Player[]) => players.map(p => p.flags.isSub));

export const selectSubCount = createSelector(selectSubs, players => {
  console.log('Update Sub Count');
  return players.reduce((prev, curr) => (curr ? prev + 1 : prev), 0);
});

const selectMaxSubs = createSelector(selectTeamForm, team =>
  team.controls.maxSubs.value >= 0 ? team.value.maxSubs : null
);

export const selectSubsRemaining = createSelector(
  selectSubCount,
  selectMaxSubs,
  (subCount, maxSubs) => {
    console.log('Update Subs Remaining');
    if (subCount === null || maxSubs === null) {
      return null;
    } else {
      return maxSubs - subCount;
    }
  }
);

export const selectTeam = createSelector(selectApp, state => state.team);
