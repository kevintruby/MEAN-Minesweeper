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
  adjacent_mine_count: number = 0;
  is_cleared: boolean = false;
  is_flagged: boolean = false;
  mine: MineComponent = null;

  constructor(private gameManagerService: GameManagerService) {}

  ngOnInit() {
    this.gameManagerService.registerCell(this);
  }

  adjacentMineCount() {
    return this.adjacent_mine_count;
  }

  clearCell() {
    this.is_cleared = true;
  }

  hasMine() {
    return !isNullOrUndefined(this.mine);
  }

  isCleared() {
    return !this.hasMine() && this.is_cleared;
  }

  isFlagged() {
    return this.is_flagged;
  }

  toggleFlag() {
    if(this.isCleared())
      return false;
    // @todo: check count of flags used against limit; only allow placement if within limit
    this.is_flagged = !this.is_flagged;
    return false;
  }

  triggerCell() {
    if(this.isCleared() || this.isFlagged())
      return false;
    if(this.hasMine()) {
      console.log('BOOM! GAME OVER, MAN!');
    }
    else {
      // @todo: clear this cell, call service to recursively clear adjacent cells
      this.clearCell();
    }
  }

}
