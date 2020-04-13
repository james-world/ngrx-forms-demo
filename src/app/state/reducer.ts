import { Action, createReducer, on } from '@ngrx/store';
import {
  createFormGroupState,
  FormGroupState,
  onNgrxForms,
  setValue,
  addArrayControl,
  updateGroup,
  updateArray,
  removeArrayControl,
} from 'ngrx-forms';
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
}

const initialFormState = createFormGroupState<Team>(formId, {
  name: 'Albion',
  maxSubs: 2,
  players: [
    { name: 'Jim', isSub: false },
    { name: 'Dave', isSub: true },
  ],
});

const initialState: State = {
  teamForm: initialFormState,
};

export const reducer = createReducer(
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
  })
);
