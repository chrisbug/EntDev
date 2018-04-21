import { TestCases } from './../_models/testCases.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { StockObject } from '../_models/stockobject.model';
import { All } from '../_models/all.model';

@Injectable()
export class ScraperService {

private readonly URL = 'https://scraper601.herokuapp.com/';

  constructor(private http: HttpClient) { }



  public listise(): Observable<StockObject> {
    return (this.http.get<StockObject>(this.URL + 'scrape?exchange=ise'));
  }

  public listall(): Observable<All> {
    return (this.http.get<All>(this.URL + 'scrape/all'));
  }

  public testOne(n: string): Observable<TestCases> {
    return (this.http.get<TestCases>(this.URL + 'scrape/test?n=' + n));
  }


}
