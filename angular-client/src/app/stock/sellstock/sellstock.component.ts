import { SoldUserHolding } from './../../_models/usersoldholdings.model';
import { StockService } from './../../_services/stock.service';
import { NgForm } from '@angular/forms';
import { ScraperService } from './../../_services/scraper.service';
import { User } from './../../_models/user.model';
import { StockObject } from './../../_models/stockobject.model';
import { UserService } from './../../_services/user.service';
import { UserHolding } from './../../_models/userholding.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgStyle, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-sellstock',
  templateUrl: './sellstock.component.html',
  styleUrls: ['./sellstock.component.css']
})
export class SellstockComponent implements OnInit {
  UserHoldingIndex: number;
  stock: UserHolding;
  iseResult: StockObject;
  ftseResult: StockObject;
  coinResult: StockObject;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private scraper: ScraperService,
    private stockService: StockService
    ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.UserHoldingIndex = params['id'];
        this.stock = this.userService.getCurrentUser().holdings[this.UserHoldingIndex];
      }
    );
    this.scraper.listall().subscribe(result => {
      console.log(result);
      this.iseResult = result.ise;
      this.ftseResult = result.ftse350;
      this.coinResult = result.coinranking;
    });
  }

  onSell(form: NgForm) {
    if (form.value.qty) {
      let qty = form.value.qty;
      if (qty > this.stock.qty) {
        qty = this.stock.qty;
      }
      const salePrice = this.currentStockValue();
      const sellingStock: SoldUserHolding = {
        company: this.stock.company,
        symbol: this.stock.symbol,
        purchesPrice: this.stock.price,
        sellPrice: salePrice,
        dateIn: this.stock.date,
        dateOut: Date.now(),
        Qty: qty
      };
      // now hit endpoint with all info
      console.log('sell: ' + qty);
      this.stockService.sellStock(sellingStock, qty, this.UserHoldingIndex).subscribe(
        result => {
          if (qty < this.stock.qty) {
            this.userService.changeUserStockQty(qty, this.UserHoldingIndex);
          } else {
            this.userService.removeUserStock(this.UserHoldingIndex);
          }
          this.userService.addToUserSoldStock(sellingStock);
          this.router.navigate(['']);
        });
    }
  }

  getSaleCost() {
    const ex = this.stock.exchange;
    // const x is calling sale value method with the findCompany and multiplies by stock qty
    if (ex === 'ftse') {
      const x = this.saleValue(this.findCompany(this.ftseResult.data, this.stock.company) * this.stock.qty);
      return x;
    } else if (ex === 'ise') {
      const x = this.saleValue(this.findCompany(this.iseResult.data, this.stock.company) * this.stock.qty);
      return x;
    } else if (ex === 'coinranking') {
      const x = this.saleValue(this.findCompany(this.coinResult.data, this.stock.company) * this.stock.qty);
      return x;
    } else {
      return 0;
    }
  }

  // multiples value of company aginst stock user owns.
  getValue() {
    const ex = this.stock.exchange;
    if (ex === 'ftse') {
      const x = this.findCompany(this.ftseResult.data, this.stock.company) * this.stock.qty;
      return x;
    } else if (ex === 'ise') {
      const x = this.findCompany(this.iseResult.data, this.stock.company) * this.stock.qty;
      return x;
    } else if (ex === 'coinranking') {
      const x = this.findCompany(this.coinResult.data, this.stock.company) * this.stock.qty;
      return x;
    } else {
      return 0;
    }
  }

  currentStockValue() {
    const ex = this.stock.exchange;
    if (ex === 'ftse') {
      return this.findCompany(this.ftseResult.data, this.stock.company);
    } else if (ex === 'ise') {
      return this.findCompany(this.iseResult.data, this.stock.company);
    } else if (ex === 'coinranking') {
      return this.findCompany(this.coinResult.data, this.stock.company);
    } else {
      return 0;
    }
  }

  getTotalCostOfSale() {
    console.log(this.getValue());
    console.log(this.getSaleCost());
    return this.getValue() - this.getSaleCost();
  }

  // searches an array and for a match on a comoany and returns the price of thier stock.
  findCompany(result: any[], curretnval: string) {
    let x = result.filter(val => val.company === curretnval)[0].price;
    x = Number(x.toString().replace(',', ''));
    return x;
  }

  // performs calcuations on number for the cost of commission
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

}
