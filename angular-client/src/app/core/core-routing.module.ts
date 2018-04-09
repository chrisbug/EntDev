import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';

const coreRoutes: Routes =[
  {path: '', component: HomeComponent, pathMatch: 'full'},

];
@NgModule({
  imports: [
    RouterModule.forRoot(coreRoutes)
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
