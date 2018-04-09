import { SoldUserHolding } from './../_models/usersoldholdings.model';
import { UserHolding } from './../_models/userholding.model';
import { HttpClient } from '@angular/common/http';
import { BuystockComponent } from './../stock/buystock/buystock.component';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { StockObject } from '../_models/stockobject.model';

@Injectable()
export class StockService {

  url = this.auth.getUrl();
  constructor(
    private userService: UserService,
    private auth: AuthenticationService,
    private http: HttpClient
  ) { }

  buyStock(stock: UserHolding) {
    return this.http.post(`${this.url}buystock`,
      { _id: this.userService.getUserId(), token: this.auth.getToken(), stockObject: stock});
  }

  sellStock(soldStock: SoldUserHolding, qty: number, stockPostion: number) {
    return this.http.post(
      `${this.url}sellstock`,
      { _id: this.userService.getUserId(), token: this.auth.getToken(), soldStock: soldStock, qty: qty, stockPostion: stockPostion}
    );
  }

}
