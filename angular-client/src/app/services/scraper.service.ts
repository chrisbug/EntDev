import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { StockObject } from '../models/stockobject.model';
import { All } from '../models/all.model';

@Injectable()
export class ScraperService {

private readonly URL = "https://myscarper101.herokuapp.com/"

  constructor(private http:HttpClient) { }



  public listise(): Observable<StockObject>{
    return (this.http.get<StockObject>(this.URL+'scrape?exchange=ise'));
  }

  public listall(): Observable<All>{
    return (this.http.get<All>(this.URL+'scrape/all'));
  }


}
