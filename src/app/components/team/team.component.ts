import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { Team } from '../../state/reducer';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'tb-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {
  @Input() team: FormGroupState<Team>;
  @Input() subCount: number;
  @Output() addPlayer = new EventEmitter<void>();
  @Output() removePlayer = new EventEmitter<number>();
  @Output() saveTeam = new EventEmitter<Team>();
  @Output() cancel = new EventEmitter<Team>();
  @ViewChild('viewport') viewport: CdkVirtualScrollViewport;

  virtualScroll = false;

  trackByIndex(index: number) {
    return index;
  }

  scrollToIndex(index: number) {
    this.viewport.scrollToIndex(index);
  }
}
