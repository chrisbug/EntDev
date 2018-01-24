import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ISE } from '../models/ise.model';

@Injectable()
export class ScraperService {

private readonly URL = "https://myscarper101.herokuapp.com/"

  constructor(private http:HttpClient) { }

  public listise(): Observable<Array<ISE>>{
    return this.http.get(this.URL+'scrape?exchange=ise');
  }


}
