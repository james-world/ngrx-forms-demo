import { createReducer, on } from '@ngrx/store';
import {
  createFormGroupState,
  FormGroupState,
  onNgrxForms,
  addArrayControl,
  updateGroup,
  updateArray,
  removeArrayControl,
  validate,
  wrapReducerWithFormStateUpdate,
  markAsPristine,
  markAsTouched,
  setAsyncError,
} from 'ngrx-forms';
import {
  required,
  greaterThanOrEqualTo,
  lessThanOrEqualTo,
} from 'ngrx-forms/validation';
import * as appActions from './actions';
import { Player, Team, State, formId, createTeam } from './model';

const initialTeam: Team = createTeam(5);
const initialFormState = createFormGroupState<Team>(formId, initialTeam);

const validateTeamForm = updateGroup<Team>(
  {
    name: validate(required),
    maxSubs: validate(greaterThanOrEqualTo(0), lessThanOrEqualTo(5)),
    players: updateArray(
      updateGroup<Player>({
        name: validate(required),
      })
    ),
  },
  {
    maxSubs: (maxSubs, teamForm) =>
      validate(maxSubs, n => {
        const subCount = teamForm.value.players.reduce(
          (prev, curr) => (curr.isSub ? prev + 1 : prev),
          0
        );
        return n >= 0 && n - subCount < 0
          ? { tooManySubs: subCount - n }
          : maxSubs.errors;
      }),
  },
  {
    maxSubs: (maxSubs, teamForm) =>
      maxSubs.isInvalid && maxSubs.isPristine
        ? markAsTouched(maxSubs)
        : maxSubs,
  }
);

const initialState: State = {
  teamForm: initialFormState,
  team: initialTeam,
};

const rawReducer = createReducer(
  initialState,
  onNgrxForms(),
  on(appActions.addPlayer, state => {
    const playerState: Player = { name: '', isSub: false };

    const addPlayer = addArrayControl<Player>(playerState);
    const updateForm = updateGroup<Team>({
      players: addPlayer,
    });
    return { ...state, teamForm: updateForm(state.teamForm) };
  }),
  on(appActions.removePlayer, (state, { index }) => {
    const removePlayer = removeArrayControl(index);
    const updateForm = updateGroup<Team>({
      players: removePlayer,
    });
    return { ...state, teamForm: updateForm(state.teamForm) };
  }),
  on(appActions.saveTeam, (state, { team }) => ({
    ...state,
    team,
    teamForm: markAsPristine(state.teamForm),
  })),
  on(appActions.initializeTeam, (state, { size }) => {
    const team = createTeam(size);
    const teamForm = createFormGroupState<Team>(formId, team);

    return {
      ...state,
      team,
      teamForm,
    };
  }),
  on(appActions.undoChanges, state => {
    return {
      ...state,
      teamForm: createFormGroupState<Team>(formId, state.team),
    };
  }),
  on(appActions.checkTeamNameFailed, (state, { name }) => {
    if (state.teamForm.controls.name.value === name) {
      const teamForm = updateGroup<Team>(state.teamForm, {
        name: setAsyncError('checkTeamName', name),
      });
      return {
        ...state,
        teamForm,
      };
    } else {
      return state;
    }
  })
);

export const reducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  s => s.teamForm,
  validateTeamForm
);
