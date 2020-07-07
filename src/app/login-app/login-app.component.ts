import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { promise } from 'selenium-webdriver';
import { AuthService } from './../service/auth.service';

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css'],
})
export class LoginAppComponent implements OnInit {

  username: string ="";
  password: string = "";
  isLoaded = false;

  constructor(private router: Router, public auth: AngularFireAuth, private alertCtrl: AlertController, private authservice: AuthService) { }

  ngOnInit() {
  /*   this.authservice.getAuth().subscribe(res => {
    if(res){
      this.router.navigateByUrl('/');
    }
    }); */
  }

  async login(): Promise<void> {
        this.isLoaded = true;
      this.authservice.onLogin(this.username + "@gmail.com", this.password).then(
        () => {
          this.isLoaded = false;
        this.router.navigateByUrl('/oilcompany/home');
      },
     async (error) => {
      let msg: string;
       if(error.code =='auth/invalid-email' ) {
        msg = "invalid user-id"
       }else if(error.code == 'auth/wrong-password'){
         msg = 'invalid password'
       }else{
         msg = "invalid user-id and password please signup"
       }
       const aletrc =  await this.alertCtrl.create({message: msg , buttons: [{text: 'Ok', role: 'cancel'}]
      });
      await aletrc.present();
    });
  }
}
