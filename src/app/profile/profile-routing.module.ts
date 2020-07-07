import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from './../guard/auth.guard';

const routes: Routes = [
{path: '', component: ProfileComponent}
];

@NgModule({
  imports: [
CommonModule,
  RouterModule.forChild(routes)
  ],
})
export class ProfileRoutingModule { }
