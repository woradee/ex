import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cartdetail',
  templateUrl: './cartdetail.page.html',
  styleUrls: ['./cartdetail.page.scss'],
})
export class CartdetailPage implements OnInit {

  cart:Array<{
    id:any,
    name:any,
    price:any,
    num:any
  }>
  total_price:number = 0;
  constructor(private storage:Storage) {
    this.cart = [];
    this.load_data();
  }

  load_data(){
    this.storage.get("cart").then((val) => {
      for(let i = 0 ; i<val.length; i++){
        console.log("record :"+val[i].name);
        this.cart.push({id:val[i].id,name:val[i].name,price:val[i].price,num:val[i].num});
      }
      console.log(this.cart);
      this.total_price = this.cal_data();
    });
  }

  cal_data(){
    let total:number = 0;
    for(let i=0; i<this.cart.length;i++){
      let price = parseFloat(this.cart[i].price);
      total += price;
    }
    return total;
  }

  ngOnInit() {
  }

}
