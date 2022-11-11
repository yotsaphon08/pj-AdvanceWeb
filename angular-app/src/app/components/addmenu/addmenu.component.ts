import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css'],
})
export class AddmenuComponent implements OnInit {
  menuForm = new FormGroup({
    //id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(100000),
    ]),
    type: new FormControl('', [Validators.required]),
    MID: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{2}'),
    ]),
    file: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
  });
  //detail!: string;
  menuType: string[] = ['', 'Hot', 'Ice', 'Smoothie'];
  menuCategory: string[] = ['', 'coffee', 'tea', 'milk'];

  previewLoaded: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {}

  onSubmit() {
    var jsonObject: any = JSON.parse(JSON.stringify(this.menuForm.value));
    console.log(jsonObject);

    if (this.menuForm.status == 'VALID') {
      this.menuService.addMenu(jsonObject);
      this.menuService.submitStatus = true;
    }

    if (this.menuService.submitStatus) {
      alert('บันทึกสำเร็จ');
      this.menuForm.reset();
    } else {
      alert('บันทึกไม่สำเร็จ');
    }

    //
  }

  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.menuForm.patchValue({
          img: reader.result as any,
        });
      };
    }
  }

  // onChangeImg(e: any) {
  //   if (e.target.files.length > 0) {
  //     const file = e.target.files[0];
  //     var pattern = /image-*/;
  //     const reader = new FileReader();
  //     if (!file.type.match(pattern)) {
  //       alert('Invalid format');
  //       this.menuForm.reset();
  //     } else {
  //       reader.readAsDataURL(file);
  //       reader.onload = () => {
  //         this.previewLoaded = true;
  //         this.menuForm.patchValue({
  //           img: reader.result as any,
  //         });
  //       };
  //     }
  //   }
  // }
  get name() {
    return this.menuForm.get('name');
  }

  get price() {
    return this.menuForm.get('price');
  }
  get type() {
    return this.menuForm.get('type');
  }

  get MID() {
    return this.menuForm.get('MID');
  }
  get category() {
    return this.menuForm.get('category');
  }

  get quantity() {
    return this.menuForm.get('quantity');
  }
  get file() {
    return this.menuForm.get('file');
  }
  get img() {
    return this.menuForm.get('img');
  }
  get detail() {
    return this.menuForm.get('detail');
  }
  resetForm() {
    this.menuForm.reset();
    this.previewLoaded = false;
  }
}
