import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css']
})
export class AddmenuComponent implements OnInit {

  menuForm = new FormGroup({
    MID: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100000)]),
  });
  
  menuType: string[] = ['', 'Hot','Ice','Smoothie'];

  constructor(private menu: MenuService) { }

  ngOnInit(): void {
  }

}
