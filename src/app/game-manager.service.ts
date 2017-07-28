import { Injectable } from '@angular/core';
import { CellComponent } from "./cell/cell.component";

const GRID_SIZES = {
  small: 8,
  medium: 16,
  large: 32
};

@Injectable()
export class GameManagerService {

  cells: CellComponent[][] = [];
  gridSize: number = GRID_SIZES.small;

  constructor() { }

  init() {
    for(let i = 0; i < this.gridSize; i++)
      this.cells[i] = [];
  }

  registerCell(cell: CellComponent) {
    this.cells[cell.row][cell.col] = cell;
    let finalIndex = this.gridSize - 1;
    if(finalIndex === cell.row && finalIndex === cell.col)
      console.log(this.cells);
  }

}
