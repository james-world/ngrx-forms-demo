import { Team, formId } from '../model';
import {
  createFormGroupState,
  onNgrxForms,
  SetValueAction,
  SetAsyncErrorAction,
} from 'ngrx-forms';
import {
  checkTeamNameReducer,
  checkTeamNameFailedReducer,
  checkTeamNameFailedAction,
} from './checkTeamName';
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

const reducer = createReducer(
  initialState,
  onNgrxForms(),
  checkTeamNameReducer,
  checkTeamNameFailedReducer
);

test('checkTeamNameReducers clear async errors from teamForm name when team name is set', () => {
  const erroredState = reducer(
    initialState,
    new SetAsyncErrorAction(`${formId}.name`, 'checkTeamName', 'Albion')
  );

  expect(erroredState.teamForm.controls.name.isInvalid).toBeTruthy();

  const changeToName = reducer(
    erroredState,
    new SetValueAction(`${formId}.name`, 'Albion Edited')
  );

  expect(changeToName.teamForm.controls.name.isValid).toBeTruthy();
});

test('checkTeamNameReducers set validating pending when team name is set', () => {
  expect(initialState.teamForm.controls.name.isValidationPending).toBeFalsy();

  const changeToName = reducer(
    initialState,
    new SetValueAction(`${formId}.name`, 'Albion Edited')
  );

  expect(changeToName.teamForm.controls.name.isValidationPending).toBeTruthy();
});

test('checkTeamNameReducers set error when team name validation fails', () => {
  const erroredState = reducer(
    initialState,
    new SetAsyncErrorAction(`${formId}.name`, 'checkTeamName', 'Albion')
  );

  expect(erroredState.teamForm.controls.name.isInvalid).toBeTruthy();

  const changeToName = reducer(
    erroredState,
    checkTeamNameFailedAction({ name: 'Albion' })
  );

  expect(changeToName.teamForm.controls.name.isValidationPending).toBeFalsy();
  console.log(changeToName.teamForm.controls.name);
  expect(changeToName.teamForm.controls.name.errors).toEqual({
    $checkTeamName: 'Albion',
  });
});
