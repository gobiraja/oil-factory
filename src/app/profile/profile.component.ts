import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Items } from '../home/home.page';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  id = [];
  customersRef: AngularFireList<Items> = null;
  cart: Items[] = [];
  product = [];
  liter = 0;
  price = 0;
  priceArray = [];
  customerName = '';
  deliveryAddress = '';
  mobileNumber = '';
  isLoaded = false;

  constructor(private route: ActivatedRoute, public db: AngularFireDatabase, 
    private http: HttpClient, private alertc: AlertController,private router: Router, public location: Location) {
  }
      ngOnInit() {
        this.route.queryParams.subscribe(param => {
          this.id = param['id'];
          this.priceArray = param['price']
    });
    this.isLoaded = true;
  for (let i=0; i< this.id.length;i++){
    this.http.get(`https://oilfactory-11817.firebaseio.com/item/${this.id[i]}.json`).subscribe(
      res =>{ 
        this.isLoaded = false;
        this.product.push(res)});
  }
  
  }

 /*  onChange(item, event) {
    console.log(item, event);
    item.count = event.detail.value;
    item.amount = item.productionPrice * event.detail.value;
    this.cart.push(item);
      } */

      increaseCartItem(product) {
        let added = false;
        for (let p of this.cart) {
          if (p.productionCode === product.productionCode) {
            p.count += 1;
            added = true;
            product.amount = p.productionPrice * p.count;
            break;
          }
        }
        if (!added) {
          product.count = 1;
          product.amount = product.productionPrice * product.count;
          this.cart.push(product);
        }    
      }
      
      decreaseCartItem(product) {
        for (let [index, p] of this.cart.entries()) {
          if (p.productionCode === product.productionCode) {
            p.count -= 1;
            product.amount = p.productionPrice * p.count;
            if (p.count == 0) {
              this.cart.splice(index, 1);
            }
          }
        }
      }

      onPlaceOrder(event){
        if(this.cart.length !== 0 ){
    this.db.list(`order`).push({cutomerName: this.customerName,
      deliveryAddress: this.deliveryAddress,
      mobileNumber: this.mobileNumber,
      cart: this.cart}).then(
        async () => {
          const altr = await this.alertc.create({
            message: 'successfully your order placed',
            buttons: [{text: 'Ok', role: 'cancel',
            handler: () => {
              let placeData;
               placeData = {
                customerName: this.customerName,
                deliveryAddress: this.deliveryAddress,
                mobileNumber: this.mobileNumber,
                cart: this.cart
              }
              this.http.post("http://localhost:3000/sendMail", placeData).subscribe(res => {
                console.log('response of email',res);
              });
              this.router.navigateByUrl('/oilcompany/home');
            }
          }]
          })
          altr.present();
        }
      );
    }else{
      alert('please increase the order');
      /* console.log('please increase the order');
     async () => {
        const alt = await this.alertc.create({
        message: 'please increase the order',
        buttons: [{text: 'Ok', role: 'cancel'}]
      });
      alt.present();
    } */
    }
    }
      /* removeProduct(product) {
        for (let [index, p] of this.cart.entries()) {
          if (p.productionCode === product.productionCode) {
            this.cart.splice(index, 1);
          }
        }
      } */
      getTotal() {
        return this.cart.reduce((i, j) => i + j.productionPrice * j.count, 0);
      }
}
