import { Action, createReducer, on } from '@ngrx/store';
import { createFormGroupState, FormGroupState, onNgrxForms } from 'ngrx-forms';

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

export const reducer = createReducer(initialState, onNgrxForms());
