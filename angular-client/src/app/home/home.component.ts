import { Component, OnInit } from '@angular/core';
import { ScraperService } from '../services/scraper.service';
import { StockObject } from '../models/stockobject.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  iseResult: StockObject;
  ftseResult: StockObject;
  coinResult: StockObject;

  constructor(private scraper:ScraperService) { }

  ngOnInit() {
    this.scraper.listall().subscribe(result =>{
      this.iseResult = result.ise;
      this.ftseResult = result.ftse350;
      this.coinResult = result.coinranking
     console.log(this.iseResult);
     console.log(this.ftseResult);
     console.log(this.coinResult);
    });
  }

}
