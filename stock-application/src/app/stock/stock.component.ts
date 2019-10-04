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
    company: "Pick a company",
    open: 0,
    high: 0,
    low: 0,
    price: 0,
    volume: 0,
    latestTradingDay: new Date('00/00/0000'),
    previousClose: "string",
    change: 0,
    changePercent: 0
  }; 

  clickCompany(company: string) {
    this.stockService.getStocks(company).subscribe({
      next: result => this.stock = result 
    });    
  }

  constructor(private stockService: StockService) { }
}
