import { Injectable } from '@angular/core';
import { CellComponent } from "./cell/cell.component";
import { MineComponent } from "./mine/mine.component";
import * as _ from "lodash";
import { isNullOrUndefined } from "util";

const DIFFICULTY_RATIOS = {
  easy: 0.25,
  medium: 0.35,
  hard: 0.4
};

const GRID_SIZES = {
  small: 9,
  medium: 16,
  large: 32
};

@Injectable()
export class GameManagerService {

  cells: CellComponent[][] = [];
  grid_size: number = GRID_SIZES.small;
  difficulty_ratio: number = DIFFICULTY_RATIOS.easy;

  flag_limit: number = 0;
  mine_limit: number = 0;
  registered_cell_count: number = 0;

  constructor() { }

  getSurroundingCells(cell: CellComponent): CellComponent[] {
    let cells = [];
    _.forEach(_.range(cell.row -1, cell.row + 2), (row: number) => {
      _.forEach(_.range(cell.col - 1, cell.col + 2), (col: number) => {
        if(cell.row === row && cell.col === col)
          return;
        if(row >= 0 && col >= 0 && row < this.grid_size && col < this.grid_size) {
          cells.push(this.cells[row][col]);
        }
      });
    });
    return cells;
  }

  init(): void {
    let limit = Math.ceil(Math.pow(this.grid_size, 2) * this.difficulty_ratio);
    this.flag_limit = limit;
    this.mine_limit = limit;

    let mine_count = 0;
    while(mine_count < this.mine_limit) {
      let row = _.random(0, this.grid_size - 1);
      let col = _.random(0, this.grid_size - 1);
      let cell = this.cells[row][col];
      if(!isNullOrUndefined(cell) && !cell.hasMine()) {
        cell.mine = new MineComponent();
        mine_count++;
      }
    }

    _.forEach(this.cells, (row: CellComponent[]) => {
      _.forEach(row, (cell: CellComponent) => {
        if(cell.adjacentMineCount())
          return;
        let cells: CellComponent[] = this.getSurroundingCells(cell);
        _.forEach(cells, (adjacent_cell: CellComponent) => {
          if(adjacent_cell.hasMine())
            cell.adjacent_mine_count++;
        });
      });
    });
  }

  registerCell(cell: CellComponent): void {
    if(!this.cells.length)
      for(let i = 0; i < this.grid_size; i++)
        this.cells[i] = [];

    this.cells[cell.row][cell.col] = cell;
    this.registered_cell_count++;
    if(this.registered_cell_count === Math.pow(this.grid_size, 2))
      this.init();
  }

}
