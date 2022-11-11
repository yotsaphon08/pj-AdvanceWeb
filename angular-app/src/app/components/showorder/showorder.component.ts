import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-showorder',
  templateUrl: './showorder.component.html',
  styleUrls: ['./showorder.component.css'],
})
export class ShoworderComponent implements OnInit {
  @Input() menus: any;
  @Output() ms = new EventEmitter<boolean>();
  constructor() {
    this.onD();
  }

  ngOnInit(): void {
    this.onD();
  }

  onD() {
    this.ms.emit(true);
  }
}
