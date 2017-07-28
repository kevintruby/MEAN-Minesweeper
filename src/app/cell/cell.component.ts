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

  @Input()
  row: number = 0;
  @Input()
  col: number = 0;
  mine: MineComponent = null;

  constructor(private gameManagerService: GameManagerService) {}

  // constructor(row: number, col: number) {
  //   if(!isNullOrUndefined(row))
  //     this.row = row;
  //   if(!isNullOrUndefined(col))
  //     this.col = col;
  // }

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

}
