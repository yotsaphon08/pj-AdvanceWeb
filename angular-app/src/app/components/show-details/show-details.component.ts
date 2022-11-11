import { Component, OnInit, Input } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css'],
})
export class ShowDetailsComponent implements OnInit {
  menu!: MenuComponent;
  showChild!: boolean;

  @Input() MenutData!: any;
  constructor() {}

  ngOnInit(): void {}
}
