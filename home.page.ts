import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  item_one_d:any[];
  box1:any;

  
  constructor() {
    this.item_one_d=["item1","item2","item3"];
  }

  get_item(){
    //console.log(this.item_one_d[1]);
    console.log(this.item_one_d);//ทั้งหมด
  }

  add_item(){
    this.item_one_d.push(this.box1);
  }

  update_item(){
    this.item_one_d[1] = "xitem" //this.box1 เปลี่ยนจาก "item1" เป็น "xitem"
  }

  remove_item(){
    this.item_one_d.splice(1,1);
  }

}