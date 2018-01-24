import { Component, OnInit } from '@angular/core';
import { ScraperService } from '../services/scraper.service';
import { ISE } from '../models/ise.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  iseResult: ISE[] = [];

  constructor(private scraper:ScraperService) { }

  ngOnInit() {
    this.scraper.listise().subscribe(result =>{
      //for(let entry of result.data){
      //  this.iseResult.push(entry)
      //}
      this.iseResult = result.data;
      console.log(this.iseResult)
    });
  }

}
