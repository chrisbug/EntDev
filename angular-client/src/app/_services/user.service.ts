import { SoldUserHolding } from './../_models/usersoldholdings.model';
import { UserHolding } from './../_models/userholding.model';

import { StockObject } from './../_models/stockobject.model';
import { Injectable } from '@angular/core';
import {AuthenticationService } from './authentication.service';
import { User } from '../_models/user';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable()
export class UserService {
  public url: string;
  public user: User;



  constructor(
    private http: HttpClient,
    private authentication: AuthenticationService,
  ) {
    this.url = authentication.getUrl();
  }

  getUser(id: string) {
    console.log(this.authentication.token);
    // add authroization header with jwt token
    const headers = new HttpHeaders({ 'x-access-token': this.authentication.getToken(), '_id': id});
    // get users from Api
    return this.http.get<User>(this.url + 'user/getuser', {headers: headers});
  }

  setUser(newUser: User) {
    this.user = newUser;
  }

  getUserByEmail(email: string) {
    console.log(this.url);
    const headers = new HttpHeaders({
      'x-access-token': this.authentication.getToken(),
      'email': email
    });
    console.log(headers.get('x-access-token'));
    return this.http.get<User>(`${this.url}getuser`, { headers: headers });
  }

  getCurrentUser() {
    return this.user;
  }

  getUserId() {
    return this.user._id;
  }

  sellStock(stockIndex: number) {
    return this.http.post(`${this.url}sellstock`,
    {'x-access-token': this.authentication.getToken(), '_id': this.user._id, 'stockIndex': stockIndex});
  }

  buyStock(stockObject: StockObject) {
    return this.http.post<StockObject>(`${this.url}buystock`,
    {'x-access-token': this.authentication.getToken(), '_id': this.user._id, 'stockObject': stockObject});
  }

  addToUserStock(newStock: UserHolding) {
    this.user.holdings.push(newStock);
  }

  removeUserStock(index: number) {
    this.user.holdings.splice(index, 1);
  }

  addToUserSoldStock(soldStock: SoldUserHolding) {
    this.user.soldHoldings.push(soldStock);
  }

  changeUserStockQty(qty: number, index: number) {
    const newQty = this.user.holdings[index].qty - qty;
    this.user.holdings[index].qty = newQty;
  }


}
