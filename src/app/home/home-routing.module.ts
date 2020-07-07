import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { AuthGuard } from './../guard/auth.guard';

const routes: Routes = [
{path: '', component: HomePage},
];

@NgModule({
  imports: [
  CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
