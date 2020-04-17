import { TestBed, async } from '@angular/core/testing';
import { reducer } from './reducer';
import { Team, formId } from './model';
import * as appActions from './actions';
import { createFormGroupState, SetValueAction } from 'ngrx-forms';

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

describe('reducer', () => {
  test('should initalize a team', () => {
    const expectedTeam: Team = {
      name: 'Albion',
      maxSubs: 2,
      players: [{ name: 'Player-0', isSub: false }],
    };

    const newState = reducer(
      initialState,
      appActions.initializeTeam({ size: 1 })
    );

    expect(newState.team).toEqual(expectedTeam);
  });

  test('addPlayer adds a player to teamForm', () => {
    const newState = reducer(initialState, appActions.addPlayer);

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

  test('removePlayer removes player from teamForm', () => {
    const newState = reducer(
      initialState,
      appActions.removePlayer({ index: 0 })
    );

    const expectedTeam: Team = {
      name: 'Albion',
      maxSubs: 2,
      players: [{ name: 'Harry', isSub: true }],
    };

    expect(newState.teamForm.value).toEqual(expectedTeam);
  });

  test('undoChanges restores teamForm from original value', () => {
    const newTeam: Team = {
      name: 'Rangers',
      maxSubs: 4,
      players: [{ name: 'Jimmy', isSub: true }],
    };

    const editedState = reducer(
      initialState,
      new SetValueAction(formId, newTeam)
    );
    expect(editedState.teamForm.value).toEqual(newTeam);

    const restoredState = reducer(editedState, appActions.undoChanges);

    expect(restoredState.teamForm.value).toEqual(initialTeam);
  });
});
