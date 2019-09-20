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
    open: "string",
    high: 0,
    low: 0,
    price: "string",
    volume: "string",
    latestTradingDay: '00/00/0000',
    previousClose: "string",
    change: "string",
    changePercent: "string"
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
          open: "string",
          change: "string",
          changePercent: "string",
          price: "string",
          previousClose: "string"
       };
        this.stock = newStock;               
      }
    });    
  }

  constructor(private stockService: StockService) { }
}
