import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  passwordType: string = 'password';
 passwordIcon: string = 'eye-off';
 username: string ="";
 password: string = "";
 confirmpassword: string = '';
 public type = 'password';
public showPass = false;


  constructor(public auth: AngularFireAuth, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {}

  async onRegister() {

await this.auth.createUserWithEmailAndPassword(this.username + '@gmail.com', this.password).then(
() => { this.router.navigateByUrl('/login')},
async (error) => {
  let msg: string;
  if (error.code =='auth/invalid-email' ) {
    msg = "invalid user-id";
   } else if (error.code === 'auth/wrong-password') {
     msg = 'invalid password';
   } else if (this.password !== this.confirmpassword) {
     msg = "please enter password same as confirm password"
   }
  const altr = await this.alertCtrl.create({message: msg, buttons: [{text: 'Ok', role: 'cancel'}]});
await altr.present();
});
};

  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
 }

  hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
}
