import { TestsComponent } from './tests/tests.component';
import { SoldstockComponent } from './soldstock/soldstock.component';
import { BuystockComponent } from './buystock/buystock.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellstockComponent } from './sellstock/sellstock.component';
import { WhatifComponent } from './whatif/whatif.component';

const stockRoutes: Routes = [
  { path: 'buystock', component: BuystockComponent },
  { path: 'sellstock', children: [
    {path: ':id', component: SellstockComponent}
  ] },
  { path: 'soldstock', component: SoldstockComponent},
  { path: 'whatif', component: WhatifComponent},
  { path: 'test', children: [
    {path: ':case', component: TestsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(stockRoutes)],
  exports: [RouterModule]
})

export class StockRoutingModule { }
