import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common'
import { GlobalQuote } from './stock';
import { StockService } from './stock.service';

@Component({
  selector: 'sa-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
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

  example: string;

  clickCompany(company: string) {
    this.stockService.getStocks(company).subscribe({
      next: result => {
        this.stock.company = result["Global Quote"]["01. symbol"];        
        this.stock.low = result['Global Quote']['04. low'];
        this.stock.high = result['Global Quote']['03. high'];
        this.stock.volume = result['Global Quote']['06. volume'];    
        this.stock.latestTradingDay = result['Global Quote']['07. latest trading day'];                
      }
    });    
  }

  constructor(private stockService: StockService) { }

  ngOnInit() {
    
  }

}
