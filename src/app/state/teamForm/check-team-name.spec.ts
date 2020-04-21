import { Team, formId } from '../model';
import {
  createFormGroupState,
  onNgrxForms,
  SetValueAction,
  SetAsyncErrorAction,
  ClearAsyncErrorAction,
} from 'ngrx-forms';
import {
  checkTeamNameReducer,
  checkTeamNameFailedReducer,
  checkTeamNameFailedAction,
  checkTeamNameEffect$,
} from './check-team-name';
import { createReducer } from '@ngrx/store';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { of } from 'rxjs';

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
  expect(changeToName.teamForm.controls.name.errors).toEqual({
    $checkTeamName: 'Albion',
  });
});

/* The rest of these tests using "marble testing" to check the behaviour of the effect
 * See https://rxjs-dev.firebaseapp.com/guide/testing/marble-testing for details.
 */

test('checkTeamNameEffect$ debounces correctly, and only validates the most recent of edits sent within a second of each other', () => {
  const validationService = {
    checkName: jest.fn(),
  } as any;

  validationService.checkName.mockReturnValueOnce(
    of({ name: 'Albion Edited Again' })
  );

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  testScheduler.run(({ hot, expectObservable }) => {
    const action$ = hot('^a 100ms b', {
      a: new SetValueAction(`${formId}.name`, 'Albion Edited'),
      b: new SetValueAction(`${formId}.name`, 'Albion Edited Again'),
    });

    expectObservable(checkTeamNameEffect$(action$, validationService)).toBe(
      ' 1102ms a',
      {
        a: new ClearAsyncErrorAction(`${formId}.name`, 'checkTeamName'),
      }
    );
  });

  expect(validationService.checkName).toHaveBeenCalledWith(
    'Albion Edited Again'
  );
});

test('checkTeamNameEffect$ sends action to clear validation state on successful validation', () => {
  const validationService = {
    checkName: jest.fn(),
  } as any;

  validationService.checkName.mockReturnValueOnce(
    of({ name: 'Albion Edited' })
  );

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  testScheduler.run(({ hot, expectObservable }) => {
    const action$ = hot('^a-', {
      a: new SetValueAction(`${formId}.name`, 'Albion Edited'),
    });

    expectObservable(checkTeamNameEffect$(action$, validationService)).toBe(
      ' 1001ms a',
      {
        a: new ClearAsyncErrorAction(`${formId}.name`, 'checkTeamName'),
      }
    );
  });
});

test('checkTeamNameEffect$ sends action to set validation error on successful validation', () => {
  const validationService = {
    checkName: jest.fn(),
  } as any;

  validationService.checkName.mockReturnValueOnce(
    of({ name: 'Albion Edited', expletive: true })
  );

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  testScheduler.run(({ hot, expectObservable }) => {
    const action$ = hot('^a-', {
      a: new SetValueAction(`${formId}.name`, 'Albion Edited'),
    });

    expectObservable(checkTeamNameEffect$(action$, validationService)).toBe(
      ' 1001ms a',
      {
        a: checkTeamNameFailedAction({ name: 'Albion Edited' }),
      }
    );
  });
});
