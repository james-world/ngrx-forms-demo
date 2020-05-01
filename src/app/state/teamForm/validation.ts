import { Team, Player } from '../model';
import { updateGroup, validate, updateArray, markAsTouched } from 'ngrx-forms';
import {
  required,
  greaterThanOrEqualTo,
  lessThanOrEqualTo,
} from 'ngrx-forms/validation';

export const validateTeamForm = updateGroup<Team>(
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
          (prev, curr) => (curr.flags.isSub ? prev + 1 : prev),
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
