import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    HomeRoutingModule
  ],
})
export class HomePageModule {}
