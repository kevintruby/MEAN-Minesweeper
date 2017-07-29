import { Component, OnInit } from '@angular/core';
import { GameManagerService } from "../game-manager.service";
import { isNullOrUndefined } from "util";

const GRID_SIZES = {
  small: 9,
  medium: 16,
  large: 32
};

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield.component.html',
  styleUrls: ['./minefield.component.css']
})

export class MinefieldComponent implements OnInit {

  // @todo: move to GameManagerService?
  gridSize: number = GRID_SIZES.medium;
  cells: number[][] = [];

  constructor(private gameManagerService: GameManagerService) {}

  getSizeClass(): string {
    if(GRID_SIZES.medium === this.gridSize)
      return 'medium';
    if(GRID_SIZES.large === this.gridSize)
      return 'large';
    return 'small';
  }

  ngOnInit(size?) {
    if(isNullOrUndefined(size))
      size = GRID_SIZES.medium;
    if(this.gridSize !== size && 0 < size)
      this.gridSize = size;
    for(let i = 0; i < this.gridSize ; i++)
    {
      this.cells[i] = [];
      for(let j = 0; j < this.gridSize; j++)
        this.cells[i][j] = j;
    }
  }

}
