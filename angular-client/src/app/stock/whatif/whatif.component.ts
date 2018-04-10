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

  getValue(stock: UserHolding) {
    if (this.iseResult && this.coinResult && this.ftseResult) {
      console.log(stock.qty * this.getCurrentValueOfStock(stock.exchange, stock.company));
      return stock.qty * this.getCurrentValueOfStock(stock.exchange, stock.company);
    } else {
      return 0;
    }
  }

  getPrice(stock: UserHolding) {
    if (this.iseResult && this.coinResult && this.ftseResult) {
      console.log(this.getCurrentValueOfStock(stock.exchange, stock.company));
      return this.getCurrentValueOfStock(stock.exchange, stock.company);
    } else { return 0; }
  }

  getSaleValue(stock: UserHolding) {
    return this.saleValue(this.getValue(stock));
  }

  getGainLoss(stock: UserHolding) {
    if (this.iseResult && this.coinResult && this.ftseResult) {
      let cost = stock.price * stock.qty;
      cost += this.getSaleValue(stock);
      const stockvalue = this.getValue(stock);
      const price = this.getCurrentValueOfStock(stock.exchange, stock.company);
      const salePrice = this.saleValue(stockvalue);
      return stockvalue - cost;
    } else { return 0; }
  }

  getGainLossPer(stock: UserHolding) {
    if (this.iseResult && this.coinResult && this.ftseResult) {
      return (this.getGainLoss(stock) / (stock.price * stock.qty)) * 100;
    } else { return 0; }
  }

  getCurrentValueOfStock(exchange: string, companyName: string) {
    if (this.iseResult && this.coinResult && this.ftseResult) {
      if (exchange === 'ise') {
        return this.findCompany(this.iseResult.data, companyName);
      } else if (exchange === 'ftse') {
        return this.findCompany(this.ftseResult.data, companyName);
      } else {
        return this.findCompany(this.coinResult.data, companyName);
      }
    } else { return 0; }
  }


  findCompany(result: any[], curretnval: string) {
    if (this.iseResult && this.coinResult && this.ftseResult) {
      let x = result.filter(val => val.company === curretnval)[0].price;
      x = Number(x.toString().replace(',', ''));
      return x;
    } else {
      return 0;
    }
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

  getGainLossWhatIf() {
    let cost = this.whatIfStockSelected.price * this.whatIfStockSelected.qty;
    cost += this.getSaleValue(this.whatIfStockSelected);
    const stockvalue = this.whatIfPrice * this.whatIfStockSelected.qty;
    return stockvalue - cost;
  }

  getGainLossWhatIfPer() {
    return (this.getGainLossWhatIf() / (this.whatIfStockSelected.price * this.whatIfStockSelected.qty))*100;
  }

  setWhatIfStock(value: UserHolding) {
    this.whatIfStockSelected = value;
    console.log('*********************************');
    console.log(this.whatIfStockSelected);
  }

}
