import { removePlayerAction, removePlayerReducer } from './remove-player';
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

const reducer = createReducer(initialState, removePlayerReducer);

test('removePlayer removes player from teamForm', () => {
  const newState = reducer(initialState, removePlayerAction({ index: 0 }));

  const expectedTeam: Team = {
    name: 'Albion',
    maxSubs: 2,
    players: [{ name: 'Harry', isSub: true }],
  };

  expect(newState.teamForm.value).toEqual(expectedTeam);
});
