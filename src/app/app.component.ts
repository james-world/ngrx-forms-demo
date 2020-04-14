import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromApp from './state/reducer';
import * as appSelectors from './state/selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'tb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'TeamBuilder';

  constructor(
    private store: Store<{ app: fromApp.State }>,
    snackBar: MatSnackBar
  ) {
    this.store.pipe(select(appSelectors.selectSubsRemaining)).subscribe({
      next: v => {
        if (v < 0) {
          snackBar.open(`There are ${-v} too many subs selected!`, null, {
            panelClass: 'tf-center',
            horizontalPosition: 'left',
          });
        } else {
          snackBar.dismiss();
        }
      },
    });
  }
}
