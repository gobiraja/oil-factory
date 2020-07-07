import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
CommonModule,
  FormsModule,
    IonicModule.forRoot(),
    ProfileRoutingModule,
    HttpClientModule
  ]
})
export class ProfileModule { }
