import {Component, Input, OnInit} from '@angular/core';
import { isNullOrUndefined } from "util";
import { GameManagerService } from "../game-manager.service";
import { MineComponent } from "../mine/mine.component";

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() row: number = 0;
  @Input() col: number = 0;
  isFlagged: boolean = false;
  mine: MineComponent = null;

  constructor(private gameManagerService: GameManagerService) {}

  ngOnInit() {
    this.gameManagerService.registerCell(this);
  }

  adjacentMineCount() {
  }

  hasMine() {
    return !isNullOrUndefined(this.mine);
  }

  isCleared() {
  }

  toggleFlag($event) {
    this.isFlagged = !this.isFlagged;
    return false;
  }

  triggerCell() {
    console.log(`triggered; isFlagged: ${this.isFlagged}; hasMine: ${this.hasMine()}`);
  }

}
