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

  gameManagerService: GameManagerService = null;

  constructor(gameManagerService: GameManagerService) {
    this.gameManagerService = gameManagerService;
  }

  ngOnInit() {
    this.gameManagerService.registerCell(this);
  }

  adjacentMineCount(): number {
    return this.adjacent_mine_count;
  }

  clearCell(): void {
    this.is_cleared = true;
  }

  hasMine(): boolean {
    return !isNullOrUndefined(this.mine);
  }

  isCleared(): boolean {
    return !this.hasMine() && this.is_cleared;
  }

  isFlagged(): boolean {
    return this.is_flagged;
  }

  toggleFlag() {
    if(this.isCleared() || this.gameManagerService.isGameOver() || this.gameManagerService.isGameWon())
      return false;
    // @todo: check count of flags used against limit; only allow placement if within limit
    this.is_flagged = !this.is_flagged;
    if(this.isFlagged()) {
      if(this.hasMine())
        this.mine.disarm();
      // @todo: decrement number of flags available
    }
    else {
      if(this.hasMine())
        this.mine.rearm();
      // @todo: increment number of flags available
    }
    return false;
  }

  triggerCell() {
    if(this.isCleared() || this.isFlagged() || this.gameManagerService.isGameOver() || this.gameManagerService.isGameWon())
      return false;
    if(this.hasMine()) {
      this.mine.trigger();
      this.gameManagerService.gameOver();
    }
    else {
      if(this.gameManagerService.isNewGame())
        this.gameManagerService.populateMinefield(this);
      this.clearCell();
      // if(!this.adjacentMineCount())
      this.gameManagerService.cascadingCellClear(this);
    }
  }

}
