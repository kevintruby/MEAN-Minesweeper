import { Injectable } from '@angular/core';
import { CellComponent } from "./cell/cell.component";
import { MineComponent } from "./mine/mine.component";
import { MinefieldComponent } from "./minefield/minefield.component";
import { isNullOrUndefined } from "util";
import * as _ from "lodash";

@Injectable()
export class GameManagerService {

  // CONSTANTS
  DIFFICULTY_RATIOS = {
    easy: 0.25,
    medium: 0.35,
    hard: 0.4
  };

  GAME_STATES = {
    initializing: 'INITIALIZING',
    ready: 'READY',
    in_progress: 'IN_PROGRESS',
    complete: 'COMPLETE',
    failed: 'FAILED'
  };

  GRID_SIZES = {
    small: 9,
    medium: 16,
    large: 32
  };
  // END CONSTANTS

  game_state: string = this.GAME_STATES.initializing;

  cells: CellComponent[][] = [];
  grid_size: number = this.GRID_SIZES.small;
  difficulty_ratio: number = this.DIFFICULTY_RATIOS.easy;
  minefield: MinefieldComponent = null;

  flags_available: number = 0;
  mine_limit: number = 0;
  registered_cell_count: number = 0;

  constructor() { }

  cascadingCellClear(cell: CellComponent): void {
    let adjacent_cells: CellComponent[] = this.getSurroundingCells(cell);
    _.forEach(adjacent_cells, (adjacent_cell: CellComponent) => {
      if(adjacent_cell.isCleared() || adjacent_cell.hasMine() || adjacent_cell.isFlagged())
        return;
      adjacent_cell.clearCell();
      if(!adjacent_cell.adjacentMineCount())
        this.cascadingCellClear(adjacent_cell);
    });
  }

  checkForWinState(): void {
    let is_complete = (0 === this.getFlagsAvailable());
    if(is_complete)
      _.forEach(this.cells, (row: CellComponent[]) => {
        _.forEach(row, (cell: CellComponent) => {
          if(cell.hasMine() && !cell.mine.isDisarmed())
            is_complete = false;
          if(!cell.hasMine() && !cell.isCleared())
            is_complete = false;
        });
      });
    if(is_complete)
      this.setGameState(this.GAME_STATES.complete);
  }

  decrementFlagsAvailable(): void {
    this.flags_available--;
  }

  gameOver(): void {
    this.setGameState(this.GAME_STATES.failed);
  }

  getFlagsAvailable(): number {
    return this.flags_available;
  }

  getGameState(): string {
    return this.game_state;
  }

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

  incrementFlagsAvailable(): void {
    this.flags_available++;
  }

  init(): void {
    // this method assumes another method has already re-configured the expected size/difficulty properties
    this.setGameState(this.GAME_STATES.initializing);
    this.cells = [];
    this.flags_available = 0;
    this.mine_limit = 0;
    this.registered_cell_count = 0;
    this.minefield.init();
  }

  isGameOver(): boolean {
    return this.GAME_STATES.failed === this.getGameState();
  }

  isGameWon(): boolean {
    return this.GAME_STATES.complete === this.getGameState();
  }

  isInitializing(): boolean {
    return this.GAME_STATES.initializing === this.getGameState();
  }

  isInProgress(): boolean {
    return this.GAME_STATES.in_progress === this.getGameState();
  }

  isNewGame(): boolean {
    return this.GAME_STATES.ready === this.getGameState();
  }

  populateMinefield(init_cell: CellComponent): void {
    if(!this.isNewGame())
      return;
    this.mine_limit = Math.ceil(Math.pow(this.grid_size, 2) * this.difficulty_ratio);
    this.flags_available = this.mine_limit;

    let mine_count = 0;
    while(mine_count < this.mine_limit) {
      let row = _.random(0, this.grid_size - 1);
      let col = _.random(0, this.grid_size - 1);
      let cell = this.cells[row][col];
      if(!isNullOrUndefined(cell) && !cell.hasMine() && !(init_cell.row === row && init_cell.col === col)) {
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

    this.setGameState(this.GAME_STATES.in_progress);
  }

  registerCell(cell: CellComponent): void {
    if(!this.cells.length)
      for(let i = 0; i < this.grid_size; i++)
        this.cells[i] = [];

    this.cells[cell.row][cell.col] = cell;
    this.registered_cell_count++;
    if(this.registered_cell_count === Math.pow(this.grid_size, 2))
      this.setGameState(this.GAME_STATES.ready);
  }

  registerMinefield(minefield: MinefieldComponent): void {
    this.minefield = minefield;
  }

  resetGame(): void {
    this.init();
  }

  setGameDifficulty(new_game_difficulty: string): void {
    if(_.indexOf(_.keys(this.DIFFICULTY_RATIOS), new_game_difficulty) > -1) {
      this.difficulty_ratio = this.DIFFICULTY_RATIOS[new_game_difficulty];
      this.init();
    }
  }

  setGameSize(new_game_size: string): void {
    if(_.indexOf(_.keys(this.GRID_SIZES), new_game_size) > -1) {
      this.grid_size = this.GRID_SIZES[new_game_size];
      this.init();
    }
  }

  setGameState(new_game_state: string): void {
    if(_.indexOf(_.values(this.GAME_STATES), new_game_state) > -1)
      this.game_state = new_game_state;
  }

}
