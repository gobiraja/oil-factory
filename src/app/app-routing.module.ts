import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';




const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', loadChildren: () => import('./login-app/login-app.module').then(m => m.LoginAppModule)},
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then( m => m.SignupModule)},
  { path: 'oilcompany/home', 
  loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate:[AuthGuard] },
  { path: 'admin/entry', loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule), canActivate:[AuthGuard]},
  { 
    path: 'oilfactory/profile',
  loadChildren: () => import('./profile/profile.module').then( m => m.ProfileModule), canActivate:[AuthGuard]},
];

@NgModule({
  imports: [
RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
