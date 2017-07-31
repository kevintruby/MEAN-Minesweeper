import { Component } from '@angular/core';
import { GameManagerService } from "./game-manager.service";
import * as _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  gameManagerService: GameManagerService = null;

  constructor(gameManagerService: GameManagerService) {
    this.gameManagerService = gameManagerService;
  }

  getDifficultyKey(): string {
    let difficulty_key = '';
    _.forEach(this.gameManagerService.DIFFICULTY_RATIOS, (val: number, key: string) => {
      if(this.gameManagerService.difficulty_ratio === val)
        difficulty_key = key;
    });
    return difficulty_key;
  }

  getSizeKey(): string {
    let size_key = '';
    _.forEach(this.gameManagerService.GRID_SIZES, (val: number, key: string) => {
      if(this.gameManagerService.grid_size === val)
        size_key = key;
    });
    return size_key;
  }
}
