import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  onLogin(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userData => resolve(userData), err => reject(err))
     });
  }
  getAuth() {
    return this.afAuth.authState.pipe(map(authv => {
      console.log(authv);
    return authv;
  }))
  };
}
