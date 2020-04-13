import { Directive, Input, Host, Optional } from '@angular/core';
import { FormControlState } from 'ngrx-forms';
import { MatInput } from '@angular/material/input';

/*
Hooks up errorState property of MatInput to ngrxFormControlState so
that mat-errors are correctly displayed.
*/
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ngrxFormControlState]',
})
export class CustomErrorStateMatcherDirective {
  @Input() set ngrxFormControlState(state: FormControlState<any>) {
    const errorsAreShown =
      state.isInvalid && (state.isTouched || state.isSubmitted);

    if (this.input) {
      this.input.errorState = errorsAreShown;
      this.input.stateChanges.next();
    }
  }

  constructor(@Host() @Optional() private input: MatInput) {}
}
