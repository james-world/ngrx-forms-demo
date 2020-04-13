import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { EventEmitter } from '@angular/core';
import { Player } from '../state/reducer';

@Component({
  selector: 'tb-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() player: FormGroupState<Player>;
  @Output() removePlayer = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
