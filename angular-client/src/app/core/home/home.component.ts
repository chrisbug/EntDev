import { UserHolding } from './../../_models/userholding.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScraperService } from '../../_services/scraper.service';
import { StockObject } from '../../_models/stockobject.model';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  iseResult: StockObject;
  ftseResult: StockObject;
  coinResult: StockObject;
  user: User;

  constructor(private scraper: ScraperService,
              private auth: AuthenticationService,
              private userService: UserService) {
              }

  ngOnInit() {
    console.log(this.auth.isAuthenticated());
    this.scraper.listall().subscribe(result => {
      console.log(result);
      this.iseResult = result.ise;
      this.ftseResult = result.ftse350;
      this.coinResult = result.coinranking;
    });
    if (this.auth.isAuthenticated()) {
      this.user = this.userService.getCurrentUser();
      console.log(this.user);
    }
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
      return ( this.getGainLoss(stock) / (stock.price * stock.qty) ) * 100;
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


  findCompany(result: any[], curretnval: string ) {
    if (this.iseResult && this.coinResult && this.ftseResult) {
      let x = result.filter(val => val.company === curretnval)[0].price;
      x = Number(x.toString().replace(',', ''));
      return x;
    } else {
      return 0;
    }
  }

  saleValue(value: number) {
    if (value * 0.01 < 25 ) {
      return 26.25;
    } else if (value > 2500000) {
      let x = value - 2500000;
      x = x * 0.005;
      return x + 25000 + 1.25;
    } else {
      return (value * 0.01) + 1.25;
    }
  }

  getTotalPurchesPrice() {
    let totalPurchesPrice = 0;
    for (const userh of this.user.holdings) {
      totalPurchesPrice += userh.price * userh.qty;
    }
     return totalPurchesPrice;
  }

  getTotalValue() {
    if (this.iseResult && this.coinResult && this.ftseResult && this.user) {
      let totalValue = 0;
      for (const userh of this.user.holdings) {
        let currentValue = 0;
        if (userh.exchange === 'ise') {
          currentValue = this.findCompany(this.iseResult.data, userh.company);
        } else if ( userh.exchange === 'ftse') {
          currentValue = this.findCompany(this.ftseResult.data, userh.company);
        } else {
          currentValue = this.findCompany(this.coinResult.data, userh.company);
        }
        totalValue += currentValue * userh.qty;
      }
      return totalValue;
    } else { return 0; }
  }

  getTotalSellPrice() {
    if (this.iseResult && this.coinResult && this.ftseResult && this.user) {
      let totalSalePrice = 0;
      for (const userh of this.user.holdings) {
        let currentValue = 0;
        if (userh.exchange === 'ise') {
          currentValue = this.findCompany(this.iseResult.data, userh.company);
        } else if (userh.exchange === 'ftse') {
          currentValue = this.findCompany(this.ftseResult.data, userh.company);
        } else {
          currentValue = this.findCompany(this.coinResult.data, userh.company);
        }
        totalSalePrice += this.saleValue(currentValue * userh.qty);
      }
      return totalSalePrice;
    } else {
      return 0;
    }
  }

  getGrossProfitAfterSaleCost() {
      return this.getTotalValue() - this.getTotalSellPrice();
  }

}
