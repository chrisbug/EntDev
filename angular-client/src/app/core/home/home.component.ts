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

  findCompany(result: any[], curretnval: string ) {
    let x = result.filter(val => val.company === curretnval)[0].price;
    x = Number(x.toString().replace(',', ''));
    return x;
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
}
