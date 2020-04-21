import { Team } from '../model';
import { createFormGroupState } from 'ngrx-forms';
import { initializeTeamReducer, initializeTeamAction } from './initialize-team';
import { createReducer } from '@ngrx/store';

const initialTeam: Team = {
  name: 'Albion',
  maxSubs: 2,
  players: [
    { name: 'Tommy', isSub: false },
    { name: 'Harry', isSub: true },
  ],
};

const initialState = {
  team: initialTeam,
  teamForm: createFormGroupState<Team>('TeamForm', initialTeam),
};

const reducer = createReducer(initialState, initializeTeamReducer);

describe('reducer', () => {
  test('should initalize a team', () => {
    const expectedTeam: Team = {
      name: 'Albion',
      maxSubs: 2,
      players: [{ name: 'Player-0', isSub: false }],
    };

    const newState = reducer(initialState, initializeTeamAction({ size: 1 }));

    expect(newState.team).toEqual(expectedTeam);
  });
});
