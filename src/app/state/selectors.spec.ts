import * as selectors from './selectors';
import { createFormGroupState } from 'ngrx-forms';
import { Team } from './model';

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

describe('My Selectors', () => {
  it('should calculate number of subs', () => {
    expect(
      selectors.selectSubCount.projector(initialState.teamForm.value.players)
    ).toEqual(1);
  });
});
