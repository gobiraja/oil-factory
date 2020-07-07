import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { ProfileComponent } from './../profile/profile.component';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  customersRef: AngularFireList<Items> = null;
  badgeval = 0;
  itemArray = [];
  items: Items[] = [];
  product = [];
  oilcompany = [];
  liter = 0;
  price = 0;
  priceArray = [];
  checkproduct = [];

  oilliter = [];
  oilprice = [];
  constructor(private modalctrl: ModalController, public anfd: AngularFireDatabase, private http: HttpClient) {
    this.customersRef = this.anfd.list('/item');
    this.customersRef.snapshotChanges().pipe(
      map(res =>
       res.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
       )
      )
      ).subscribe(resp => {
        resp.forEach(
          a => {this.product.push(a);
          });
      });
  }


  ngOnInit() {
 

    this.http.get(`https://oilfactory-11817.firebaseio.com/item.json`).subscribe(
      res => this.checkproduct.push(res));
      console.log("product");
      console.log(this.checkproduct);
  }

  addCart(items: Items, event) {
    if(!this.itemArray.includes(items.key)){
   this.itemArray.push(items.key);
   this.badgeval = this.badgeval + 1;
 }

}

 clearCart() {
 this.badgeval = 0;
 this.itemArray = [];
  }

 /*  async clickCart(event) {
    const modal = await this.modalctrl.create({
      component: ProfileComponent,
      componentProps: this.itemarray,
    });
    return await modal.present();
  } */
}


export interface Items {
key: string;
productionCode: string;
productionName: string;
productionPrice: number;
productImageUrl: string;
productionDescription: string;
amount: number;
count: number;
}
