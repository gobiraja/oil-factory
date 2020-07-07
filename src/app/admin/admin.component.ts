import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import * as uuid from 'uuid';
import { AlertController } from '@ionic/angular';
import { EMPTY } from 'rxjs';
import { Routes, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  productionCode = '';
  productionName = '';
  productionPrice = '';
  ProductImageUrl: Observable<string>;
  productionDescription = '';
  uploadProgress: Observable<number>;
  snapshot: Observable<any>;
  task: AngularFireUploadTask;
  constructor(public db: AngularFireDatabase, public afsg: AngularFireStorage,
    private alertc: AlertController , private router: Router, public location: Location) { }

  ngOnInit() {}

  onRegister() {
    const myId = uuid.v4();
    this.db.list(`item`).push({productionCode: this.productionCode,
      productionName: this.productionName,
      productionPrice: this.productionPrice,
      ProductImageUrl: this.ProductImageUrl,
      productionDescription: this.productionDescription}).then(
        async () => {
          const altr = await this.alertc.create({
            message: 'successfully data inserted',
            buttons: [{text: 'Ok', role: 'cancel',
            handler: () => {
              this.router.navigateByUrl('/oilcompany/home');
              location.reload();
            }
          }]
          })
          altr.present();
        }
      );
    
      /* const itemRef = this.db.object('item');
    itemRef.set({
      productionCode: this.productionCode,
      productionName: this.productionName,
      productionPrice: this.productionPrice,
      ProductImageUrl: this.ProductImageUrl,
      productionDescription: this.productionDescription
      }); */
      console.log('done');
  }

  upload(event) {
    const file = event.target.files[0];
    const filePath = `productImages/${new Date().getTime()}_${file.name}`;
    const task = this.afsg.upload(filePath, file).then(() => {
         const ref = this.afsg.ref(filePath);
         const downloadURL = ref.getDownloadURL().subscribe(url => {
         this.ProductImageUrl = url // with this you can use it in the html
         console.log(url);
     }) 
});
}
}