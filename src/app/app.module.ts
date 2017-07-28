import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CellComponent } from './cell/cell.component';
import { GameManagerService } from './game-manager.service';
import { MineComponent } from './mine/mine.component';
import { MinefieldComponent } from './minefield/minefield.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    MineComponent,
    MinefieldComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GameManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
