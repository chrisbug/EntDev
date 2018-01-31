export class StockObject {
  exchange: string;
  source: string;
  time: string;
  cached: boolean;
  details: string;
  data:[{
    comapny: string;
    symbol: string;
    price: number;
    change: number;
    pChg: string;
  }]
}
