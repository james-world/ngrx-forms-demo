import { createAction, On, on } from '@ngrx/store';
import { State, Player, Team } from '../model';
import { addArrayControl, updateGroup } from 'ngrx-forms';

export const addPlayerAction = createAction('[Team Form] Add Player');

export const addPlayerReducer: On<State> = on(addPlayerAction, state => {
  const playerState: Player = { name: '', isSub: false };

  const addPlayer = addArrayControl<Player>(playerState);
  const updateForm = updateGroup<Team>({
    players: addPlayer,
  });
  return { ...state, teamForm: updateForm(state.teamForm) };
});
