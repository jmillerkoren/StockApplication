import { Component } from '@angular/core';
import { GlobalQuote } from './stock';
import { StockService } from './stock.service';

@Component({
  selector: 'sa-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  stock: GlobalQuote = { 
    company: "string",
    open: 0,
    high: 0,
    low: 0,
    price: 0,
    volume: 0,
    latestTradingDay: '00/00/0000',
    previousClose: "string",
    change: 0,
    changePercent: 0
  };

  example: string = 'It worked';

  clickCompany(company: string) {
    this.stockService.getStocks(company).subscribe({
      next: result => {
        let newStock: GlobalQuote = {
          company: result["Global Quote"]["01. symbol"],
          low: result['Global Quote']['04. low'],
          high: result['Global Quote']['03. high'],
          volume: result['Global Quote']['06. volume'],
          latestTradingDay: result['Global Quote']['07. latest trading day'],
          open: result['Global Quote']['02. open'],
          change: 0,
          changePercent: 0,
          price: result['Global Quote']['05. price'],
          previousClose: "string"
       };
        this.stock = newStock;               
      }
    });    
  }

  constructor(private stockService: StockService) { }
}
