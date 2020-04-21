import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { checkTeamNameEffect$ } from './teamForm/checkTeamName';
import { ValidationService } from '../validation.service';

@Injectable()
export class AppEffects {
  constructor(
    private action$: Actions,
    private validationService: ValidationService
  ) {}

  checkTeamName$ = checkTeamNameEffect$(this.action$, this.validationService);
}
