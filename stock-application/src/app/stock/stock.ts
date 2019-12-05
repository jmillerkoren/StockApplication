export interface GlobalQuote {
  company: string;
  open: number;
  high: number;
  low: number;
  close: number;
  price: number;
  volume: number;
  latestTradingDay: Date;
  previousClose: string;
  change: number;
  changePercent: number;
}
