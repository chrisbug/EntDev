import { FormsModule } from '@angular/forms';
import { BuystockComponent } from './buystock//buystock.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellstockComponent } from './sellstock/sellstock.component';
import { StockRoutingModule } from './stock-routing.module';
import { SoldstockComponent } from './soldstock/soldstock.component';
import { WhatifComponent } from './whatif/whatif.component';
import { TestsComponent } from './tests/tests.component';

@NgModule({
  imports: [
    CommonModule,
    StockRoutingModule,
    FormsModule
  ],
  declarations: [
    SellstockComponent,
    BuystockComponent,
    SoldstockComponent,
    WhatifComponent,
    TestsComponent
  ],
  exports: [
    StockRoutingModule,
    SellstockComponent,
    BuystockComponent,
    WhatifComponent
  ]
})
export class StockModule { }
