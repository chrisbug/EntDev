import { NgForm } from '@angular/forms';
import { UserHolding } from './../../_models/userholding.model';
import { UserService } from './../../_services/user.service';
import { AuthenticationService } from './../../_services/authentication.service';
import { ScraperService } from './../../_services/scraper.service';
import { User } from './../../_models/user';
import { StockObject } from './../../_models/stockobject.model';
import { Component, OnInit } from '@angular/core';
import { StockValue } from '../../_models/stockvalue.model';

@Component({
  selector: 'app-whatif',
  templateUrl: './whatif.component.html',
  styleUrls: ['./whatif.component.css']
})
export class WhatifComponent implements OnInit {

  iseResult: StockObject;
  ftseResult: StockObject;
  coinResult: StockObject;
  user: User;
  whatIfStockSelected: UserHolding;
  whatIfPrice = 0;

  constructor(
    private scraper: ScraperService,
    private auth: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    console.log(this.auth.isAuthenticated());
    this.scraper.listall().subscribe(result => {
      this.iseResult = result.ise;
      this.ftseResult = result.ftse350;
      this.coinResult = result.coinranking;
    });
    this.user = this.userService.getCurrentUser();
    // this.whatIfStockSelected = this.user.holdings[0];
    console.log(this.whatIfStockSelected);
  }

  findCompany(result: any[], curretnval: string) {
    const x: UserHolding = result.filter(val => val.company === curretnval)[0];
    const y: Number = Number(x.price.toString().replace(',', ''));
    return y;
  }

  saleValue(value: number) {
    if (value * 0.01 < 25) {
      return 26.25;
    } else if (value > 2500000) {
      let x = value - 2500000;
      x = x * 0.005;
      return x + 25000 + 1.25;
    } else {
      return (value * 0.01) + 1.25;
    }
  }

  setWhatIfStock(value: UserHolding) {
    this.whatIfStockSelected = value;
    console.log('*********************************');
    console.log(this.whatIfStockSelected);
  }

}
