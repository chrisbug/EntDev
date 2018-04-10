import { StockService } from './../../_services/stock.service';
import { StockValue } from './../../_models/stockvalue.model';
import { UserHolding } from './../../_models/userholding.model';
import { User } from './../../_models/user';
import { StockObject } from './../../_models/stockobject.model';
import { ScraperService } from './../../_services/scraper.service';
import { AuthenticationService } from './../../_services/authentication.service';
import { UserService } from './../../_services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgStyle, DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-buystock',
  templateUrl: './buystock.component.html',
  styleUrls: ['./buystock.component.css']
})
export class BuystockComponent implements OnInit {
  showIse = true;
  showFtse = false;
  showCoin = false;
  ise: StockObject;
  ftse: StockObject;
  coin: StockObject;
  user: User;
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private auth: AuthenticationService,
    private scraper: ScraperService,
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.scraper.listall().subscribe(result => {
      this.ise = result.ise;
      this.ftse = result.ftse350;
      this.coin = result.coinranking;
    });
  }

  showCoinStock() {
    this.showIse = false;
    this.showFtse = false;
    this.showCoin = true;
  }

  showIseStock() {
    this.showCoin = false;
    this.showFtse = false;
    this.showIse = true;
  }

  showFtseStock() {
    this.showCoin = false;
    this.showIse = false;
    this.showFtse = true;
  }

  onBuyStock(stock: StockValue, form: NgForm, exchange: string) {
    const validateNum = Number(stock.price.toString().replace(',', ''));
    console.log(validateNum);
    const boughtStock: UserHolding = {
      company: stock.company,
      symbol: stock.symbol,
      price: validateNum,
      qty: form.value.qty,
      exchange: exchange,
      date: Date.now()
    };
    this.stockService.buyStock(boughtStock).subscribe(
       result => {this.userService.addToUserStock(boughtStock);
      });
  }

}
