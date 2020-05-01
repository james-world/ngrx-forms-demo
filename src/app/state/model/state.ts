import { Team } from './team';
import { FormGroupState } from 'ngrx-forms';

export const formId = 'TeamForm';

export interface State {
  teamForm: FormGroupState<Team>;
  team: Team;
}

export function createTeam(size: number): Team {
  const team: Team = {
    name: 'Albion',
    maxSubs: 2,
    players: [],
  };

  for (let i = 0; i < size; i++) {
    team.players.push({ name: `Player-${i}`, flags: { isSub: false } });
  }

  return team;
}
