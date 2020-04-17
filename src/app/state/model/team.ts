import { Player } from './player';

export interface Team {
  name: string;
  maxSubs: number;
  players: Player[];
}
