import { addPlayerAction, addPlayerReducer } from './add-player';
import { Team } from '../model';
import { createFormGroupState } from 'ngrx-forms';
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

const reducer = createReducer(initialState, addPlayerReducer);

test('addPlayer adds a player to teamForm', () => {
  const newState = reducer(initialState, addPlayerAction);

  const expectedTeam: Team = {
    name: 'Albion',
    maxSubs: 2,
    players: [
      { name: 'Tommy', isSub: false },
      { name: 'Harry', isSub: true },
      { name: '', isSub: false },
    ],
  };

  expect(newState.teamForm.value).toEqual(expectedTeam);
});
