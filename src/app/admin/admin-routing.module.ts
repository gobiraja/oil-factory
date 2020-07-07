import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './../guard/auth.guard';

const routes: Routes = [
  { path: '', component: AdminComponent}
];

@NgModule({
  imports: [CommonModule,
RouterModule.forChild(routes),
  ]
})
export class AdminRoutingModule { }
