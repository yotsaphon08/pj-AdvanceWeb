import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css']
})
export class AddmenuComponent implements OnInit {

  menuForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100000)]),
    type: new FormControl('', [Validators.required]),
    MID: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
  });
  
  menuType: string[] = ['', 'Hot','Ice','Smoothie'];
  menuCategory: string[] = ['', 'coffee','tea','milk'];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
  }

  onSubmit() {

    var jsonObject : any = JSON.parse(JSON.stringify(this.menuForm.value))
    console.log(jsonObject)

    if(this.menuForm.status == 'VALID'){
      this.menuService.addMenu(jsonObject)
      this.menuService.submitStatus = false;
    }

    if(this.menuService.submitStatus){
      alert('บันทึกสำเร็จ');
    }else{
      alert('บันทึกไม่สำเร็จ');
    }

    this.menuForm.reset();
  }

}
