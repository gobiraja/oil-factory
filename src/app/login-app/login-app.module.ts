import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginAppComponent } from './login-app.component';
import { LoginAppRoutingModule } from './login-app-routing.module';


@NgModule({
  declarations: [LoginAppComponent],
  imports: [
CommonModule,
FormsModule,
ReactiveFormsModule,
  IonicModule.forRoot(),
  LoginAppRoutingModule
  ]
})
export class LoginAppModule { }
