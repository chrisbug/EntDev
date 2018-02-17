import { Component, OnInit } from '@angular/core';
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

  constructor(private scraper:ScraperService,
              private auth:AuthenticationService,
              private userService:UserService) { }

  ngOnInit() {
    this.scraper.listall().subscribe(result =>{
      this.iseResult = result.ise;
      this.ftseResult = result.ftse350;
      this.coinResult = result.coinranking
     console.log(this.iseResult);
     console.log(this.ftseResult);
     console.log(this.coinResult);
    });
    if(this.auth.isAuthenticated()){
      this.userService.getUser(localStorage.getItem['userId']).subscribe(
      (response:Response) => {
        this.user = response.user;
        console.log(this.user)
        });
      } else{
        this.user = {
          _id: 'Loading',
          email: 'Loading',
          stocks: [],
          soldStocks: []
          }
      }
    }
  }
