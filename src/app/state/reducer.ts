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
  markAsDirty,
  markAsTouched,
  setValue,
} from 'ngrx-forms';
import {
  required,
  greaterThanOrEqualTo,
  lessThanOrEqualTo,
  lessThan,
} from 'ngrx-forms/validation';
import * as appActions from './actions';

export interface Player {
  name: string;
  isSub: boolean;
}

export interface Team {
  name: string;
  maxSubs: number;
  players: Player[];
}

const formId = 'TeamForm';

export interface State {
  teamForm: FormGroupState<Team>;
  team: Team;
}

function initializeTeam(size: number): Team {
  const team: Team = {
    name: 'Albion',
    maxSubs: 2,
    players: [],
  };

  for (let i = 0; i < size; i++) {
    team.players.push({ name: `Player-${i}`, isSub: false });
  }

  return team;
}

const initialTeam: Team = initializeTeam(5);

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
    const team = initializeTeam(size);
    const teamForm = createFormGroupState<Team>(formId, team);

    return {
      ...state,
      team,
      teamForm,
    };
  })
);

export const reducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  s => s.teamForm,
  validateTeamForm
);
