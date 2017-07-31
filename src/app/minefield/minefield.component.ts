import { Component, OnInit } from '@angular/core';
import { GameManagerService } from "../game-manager.service";

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield.component.html',
  styleUrls: ['./minefield.component.css']
})

export class MinefieldComponent implements OnInit {

  cells: number[][] = [];

  constructor(private gameManagerService: GameManagerService) {}

  getSizeClass(): string {
    if(this.gameManagerService.GRID_SIZES.medium === this.gameManagerService.grid_size)
      return 'medium';
    if(this.gameManagerService.GRID_SIZES.large === this.gameManagerService.grid_size)
      return 'large';
    return 'small';
  }

  ngOnInit() {
    for(let i = 0; i < this.gameManagerService.grid_size ; i++) {
      this.cells[i] = [];
      for(let j = 0; j < this.gameManagerService.grid_size; j++)
        this.cells[i][j] = j;
    }
  }

}
