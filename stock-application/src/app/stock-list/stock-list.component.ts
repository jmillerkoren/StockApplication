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
  filteredStocks: GlobalQuote[];  
  toggle: string;

  constructor(private stockService: StockService) { }

  getListStocks (company: string) {
    this.stockService.getListStocks(company).subscribe({
      next: result => {
        this.stocks = result
        this.displayStocks = result; 
        this.filteredStocks = result;
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

  filterStocksMonth() {
    let currentDate = new Date();    
    let filtered = this.stocks.filter(x => {
      let date = new Date(x.latestTradingDay);
      if (((date.getMonth() === currentDate.getMonth()) || (date.getMonth() <= (currentDate.getMonth() + 6))) && date.getFullYear() === currentDate.getFullYear()) {
        return x;
      }
      });
    this.filteredStocks = filtered; 
    this.displayStocks = filtered;       
  }

  filterStocksYear() {

  }

  filterStocksDecade() {

  }

  ngOnInit() {
  }

}
