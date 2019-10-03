import { Component, OnInit } from '@angular/core';
import { GlobalQuote } from '../stock/stock';
import { StockService } from '../stock/stock.service';

@Component({
  selector: 'sa-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  private toggleOn: string = "Show Stocks";
  private toggleOff: string = "Hide Stocks";
  stocks: GlobalQuote[];
  displayStocks: GlobalQuote[];   
  toggle: string;

  constructor(private stockService: StockService) { }

  getListStocks (company: string) {
    this.stockService.getListStocks(company).subscribe({
      next: result => {
        this.stocks = result
        this.displayStocks = result; 
        this.toggle = this.toggleOff;       
      }
    });
  }

  toggleStocks() {
    if (this.displayStocks === null) {
      this.displayStocks = this.stocks;
      this.toggle = this.toggleOff;        
      return;
    }
    this.displayStocks = null;  
    this.toggle = this.toggleOn;    
  }

  ngOnInit() {
  }

}
