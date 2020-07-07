import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';



@NgModule({
  declarations: [AdminComponent],
  imports: [
CommonModule,
    IonicModule.forRoot(),
    AdminRoutingModule,
    FormsModule,
  ],
  providers: []
})
export class AdminModule { }
