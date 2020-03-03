import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';
import { from } from 'rxjs';
import { HttpClient,HttpHeaders,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import { error } from 'util';
@Component({
  selector: 'app-two',
  templateUrl: './two.page.html',
  styleUrls: ['./two.page.scss'],
})
export class TwoPage implements OnInit {

  item_two_d:Array<{id:any,name:any,price:any,num:any,vender:{vid:any,vname:any,vrate:any}}> /*ข้อมูล 1ชุด */
  cart:Array<{id:any,name:any,price:any,num:any}>
  total_num:any = 0;
  total_price:any =0;

  cus_id:any=null;
  tran_address:any=null;

  constructor(private storage: Storage , public router:Router ,private http: HttpClient) { 
    /*
    this.item_two_d=[
      {id:'A001',name:'เครื่องดูดฝุ่น',price:3500,num:'2',vender:{vid:'V001',vname:'homehug',vrate:'5'}},
      {id:'T002',name:'ถุงเท้า',price:70,num:'1',vender:{vid:'V002',vname:'b2s',vrate:'4'}},
      {id:'P003',name:'ไส้ดินสอ',price:15,num:'2',vender:{vid:'V003',vname:'zara',vrate:'3'}},
      {id:'C004',name:'หูฟัง',price:590,num:'20',vender:{vid:'V004',vname:'brig',vrate:'2'}}
    ];*/
    this.item_two_d=[];
    this.get_product_list();
    this.cart=[];
    this.come_back();
    
  }

  get_product_list(){ //โชว์สินค้า
    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions = new HttpResponse({ headers: headers });
    
    let postData= null;    
    let uri="http://127.0.0.1/php_32_proj2/webservice/get_product_list.php";
    this.http.post(uri,postData,requestOptions).subscribe(
      data=>{
        let json_data:any=data;
        //console.log(json_data[2].pro_name);
        for (let i =0;i<json_data.length;i++){
          //console.log(json_data[i].pro_name);
          this.item_two_d.push({id:json_data[i].pro_id,name:json_data[i].pro_name,price:json_data[i].pro_price,num:json_data[i].pro_num,vender:{vid:null,vname:null,vrate:null}});
        }
      }
      ,error=>{

      }
    );

    
  }
  
  come_back(){ //ดึงข้อมูลกลับ 
    this.storage.get('cus_id').then((val) => {
      //console.log('Your age is', val);
      this.cus_id=val;
    });

    this.storage.get('tran_address').then((val) => {
      //console.log('Your age is', val);
      this.tran_address=val;
    });

    this.storage.get('cart').then((val) => {
      for(let i=0;i<val.length;i++){
        //console.log( "record :"+val[i].name);
        this.cart.push({id:val[i].id,name:val[i].name,price:val[i].price,num:val[i].num});
      }
      this.total_num=this.cal_num (); //คงค่าจำนวนสินค้าไว้      ข้อมูลผู้ซื้อ
      this.total_price=this.cal_price();//คงค่าราคาไว้         ข้อมูลผู้ซื้อ
      console.log(this.cart);
    });
    

  }

  add_card(item_id:any,item_name:any,item_price:any,item_num:any){
    //console.log("add cart" +item_id);
    this.cart.push({id:item_id,name:item_name,price:item_price,num:item_num});
    console.log(this.cart);
    //console.log("จำนวนสินค้า" +this.cal_num());
    //console.log("ราคารวม" +this.cal_price());
    this.total_num=this.cal_num ();
    this.total_price=this.cal_price();

    this.storage.set("cus_id",this.cus_id);//เก็บค่า idลูกค้า จาก กล่อง
    this.storage.set("tran_address",this.tran_address);
    this.storage.set("cart",this.cart);


    //cal service add_card.php
    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions = new HttpResponse({ headers: headers });
    let postData={
      "cus_id":"CUS001",
      "pro_id":"PRO001",
      "pro_name":"iphone",
      "pro_price":"50000",
      "pro_num":"5"
    }
    let uri="http://127.0.0.1/php_32_proj2/webservice/add_cart.php";
    this.http.post(uri,postData,requestOptions).subscribe(
      data=>{
        let json_data:any=data;
        console.log(json_data.result);
        this.total_num = json_data.result;
      }
      ,error=>{

      }

    );
    //subscribe รับข้อมูลกลับ

  }
  cal_num(){
    let totoal_num:number=0;
    for(let i=0; i<this.cart.length; i++){
      let num = parseInt(this.cart[i].num) ; //เปลี่ยน string เป็น ตัวเลข เพื่อเอาไปคำนวณ
      totoal_num = totoal_num + num;
    }
    return totoal_num;
  }

  cal_price(){
    let totoal_price:number=0;
    for(let i=0; i<this.cart.length; i++){
      let num = parseInt(this.cart[i].price) ; //เปลี่ยน string เป็น ตัวเลข เพื่อเอาไปคำนวณ
      totoal_price = totoal_price + num;
    }
    return totoal_price;
  }
  //call service

  get_item(){
    console.log(this.item_two_d);//ทั้งหมด
    //console.log(this.item_two_d[2]);//ปากกา
    //console.log(this.item_two_d[2].id);//P00
    //console.log(this.item_two_d[2].vender.vname);//zara

  }
  add_item(){
    this.item_two_d.push({id:'C005',name:'แบต',price:'3300',num:'10',vender:{vid:'V003',vname:'chaiya',vrate:'10'}});
  }
  update_item(){
    this.item_two_d[2].name='ดินสอ';
    this.item_two_d[2].vender.vname='Block'; //ที่P003
  }

  remove_item(){
    this.item_two_d.slice(1,1);
    //this.item_two_d
  }
  
  


  gotoCartDetail(){
    
    this.router.navigate(["/cartdetail"]);
  }

  ngOnInit() {
  }

}
