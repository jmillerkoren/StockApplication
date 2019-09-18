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
    latestTradingDay: "string",
    previousClose: "string",
    change: "string",
    changePercent: "string"
  };

  example: string;

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getStocks().subscribe({
      next: result => {              
        this.example = result["Global Quote"]["01. symbol"]; 
        console.log(this.example); 
        this.stock.company = result["Global Quote"]["01. symbol"];        
        this.stock.low = result['Global Quote']['04. low'];
        this.stock.high = result['Global Quote']['03. high'];
        this.stock.volume = result['Global Quote']['06. volume'];            
        console.log(this.stock.company);  
      }
    });
  }

}
