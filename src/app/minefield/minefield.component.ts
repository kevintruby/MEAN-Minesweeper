import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minefield',
  templateUrl: './minefield.component.html',
  styleUrls: ['./minefield.component.css']
})
export class MinefieldComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  gridSize = 8;

}
