import { UserHolding } from './../../_models/userholding.model';
import { UserService } from './../../_services/user.service';
import { User } from './../../_models/user';
import { TestCases } from './../../_models/testCases.model';
import { StockObject } from './../../_models/stockobject.model';
import { ScraperService } from './../../_services/scraper.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import * as userData from './../../_models/testcaseHolding.json';


@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  case: string;
  testResponse: TestCases;
  iseResult: StockObject;
  ftseResult: StockObject;
  coinResult: StockObject;
  user: User = {
    _id : '1',
    email: 'test@test.com',
    holdings: (<any>userData).holdings,
    soldHoldings: []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scraperS: ScraperService,
    private userService: UserService,
    private auth: AuthenticationService
    ) { }

  ngOnInit() {
    console.log(this.user);
    this.route.params.subscribe(
      (params: Params) => {
        this.case = params['case'];
        this.scraperS.testOne(this.case).subscribe(
          result => {
            this.testResponse = result;
            const iseToParseCorectly = {
              exchange: this.testResponse.ise.exchange,
              source: this.testResponse.ise.source,
              time: this.testResponse.ise.time,
              cached: this.testResponse.ise.cached,
              details: this.testResponse.ise.details,
              data: this.testResponse.ise.data
            };
            const ftseToParseCorectly = {
              exchange: this.testResponse.ftse350.exchange,
              source: this.testResponse.ftse350.source,
              time: this.testResponse.ftse350.time,
              cached: this.testResponse.ftse350.cached,
              details: this.testResponse.ftse350.details,
              data: this.testResponse.ftse350.data
            };
            const coinToParseCorectly = {
              exchange: this.testResponse.coinranking.exchange,
              source: this.testResponse.coinranking.source,
              time: this.testResponse.coinranking.time,
              cached: this.testResponse.coinranking.cached,
              details: this.testResponse.coinranking.details,
              data: this.testResponse.coinranking.data
            };

            for (const value of iseToParseCorectly.data) {
              value.price = Number(value.price);
              value.change = Number(value.change);
              if (value.company === 'AIB GROUP PLC' ) {
                value.company = 'AIB';
              }
              if (value.company === 'BK IRE GRP PLC') {
                value.company = 'Bank of Ireland';
              }
              if (value.company === 'CRH PLC') {
                value.company = 'CRH';
              }
            }
            for (const value of ftseToParseCorectly.data) {
              value.price = Number(value.price);
              value.change = Number(value.change);
            }
            for (const value of coinToParseCorectly.data) {
              value.price = Number(value.price);
              value.change = Number(value.change);
            }
            this.iseResult = iseToParseCorectly;
            this.ftseResult = ftseToParseCorectly;
            this.coinResult = coinToParseCorectly;
          });
      }
    );
  }

  getValue(stock: UserHolding) {
    if (this.iseResult && this.coinResult && this.ftseResult) {
      return stock.qty * this.getCurrentValueOfStock(stock.exchange, stock.company);
    } else {
      return 0;
    }
  }

  getPrice(stock: UserHolding) {
    if (this.iseResult && this.coinResult && this.ftseResult) {
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
      return (this.getGainLoss(stock) / (stock.price * stock.qty));
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
    } else if (value > 25000) {
      // const x = value - 2500000;
      // const y = (value - 2500000) * 0.005;
      // return value - ( x + y + 1.25 );
      let x = value - 25000;
      const y = 25000 * 0.01;
      x = x * 0.005;
      const deduction = Number(x) + Number(y) + 1.25;
      return deduction;
    } else {
      return (value * 0.01) + 1.25;
    }
  }

  getTotalPurchesPrice() {
    let totalPurchesPrice = 0;
    for (const userh of this.user.holdings) {
      totalPurchesPrice += userh.price * userh.qty;
    }
    return totalPurchesPrice + 100;
  }

  getTotalValue() {
    if (this.iseResult && this.coinResult && this.ftseResult && this.user) {
      let totalValue = 0;
      for (const userh of this.user.holdings) {
        let currentValue = 0;
        if (userh.exchange === 'ise') {
          currentValue = this.findCompany(this.iseResult.data, userh.company);
        } else if (userh.exchange === 'ftse') {
          currentValue = this.findCompany(this.ftseResult.data, userh.company);
        } else {
          currentValue = this.findCompany(this.coinResult.data, userh.company);
        }
        totalValue += currentValue * userh.qty;
      }
      return totalValue + 100;
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
