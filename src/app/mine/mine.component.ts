import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {

  is_armed: boolean = true;
  is_triggered: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  isDisarmed(): boolean {
    return !this.is_armed;
  }

  isTriggered(): boolean {
    return this.is_triggered;
  }

  disarm(): void {
    this.is_armed = false;
  }

  rearm(): void {
    this.is_armed = true;
  }

  trigger(): void {
    this.is_triggered = true;
  }

}
