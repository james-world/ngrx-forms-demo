import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { State } from './model';
import { checkTeamNameEffect$ } from './teamForm/checkTeamName';
import { ValidationService } from '../validation.service';

@Injectable()
export class AppEffects {
  constructor(
    private action$: Actions,
    private store: Store<State>,
    private validationService: ValidationService
  ) {}

  checkTeamName$ = checkTeamNameEffect$(this.action$, this.validationService);
}
