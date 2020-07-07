import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginAppComponent } from './login-app.component';



const routes: Routes = [
  { path: '', component: LoginAppComponent }
];

@NgModule({
  imports: [
RouterModule.forChild(routes),
CommonModule
  ],

  exports: [RouterModule]
})
export class LoginAppRoutingModule { }
