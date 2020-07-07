import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public auth: AngularFireAuth ){
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return  this.auth.authState.pipe(map(authv => {
      if (!authv) {
        console.log(authv);
        this.router.navigate(["/login"]);
      return false;
      } else {
        console.log('authendication true');
        console.log(authv);
      return true;
      }
  }));
  }
}
