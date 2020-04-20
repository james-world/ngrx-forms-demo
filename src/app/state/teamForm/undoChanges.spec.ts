import { Team, formId } from '../model';
import { SetValueAction, createFormGroupState, onNgrxForms } from 'ngrx-forms';
import { undoChangesReducer, undoChangesAction } from './undoChanges';
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

const reducer = createReducer(initialState, onNgrxForms(), undoChangesReducer);

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

  const restoredState = reducer(editedState, undoChangesAction);

  expect(restoredState.teamForm.value).toEqual(initialTeam);
});
