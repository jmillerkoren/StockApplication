import { Component, OnInit } from '@angular/core';
import { GlobalQuote } from '../stock/stock';
import { StockService } from '../stock/stock.service';
import { CompareDate } from '../shared/compare-date.service';

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

  constructor(private stockService: StockService, private compareDate: CompareDate) { }

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
    let filtered = this.stocks.filter(x => {
      let date = new Date(x.latestTradingDay);
      let end = new Date();
      let start = new Date();
      start.setMonth(start.getMonth() - 6);
      if (this.compareDate.inRangeMonth(date, start, end)) {
        return x;
      }
      });
    this.filteredStocks = filtered; 
    this.displayStocks = filtered;       
  }

  filterStocksYear() {
    let filtered = this.stocks.filter(x => {
      let date = new Date(x.latestTradingDay);
      let end = new Date();
      let start = new Date();
      start.setFullYear(start.getFullYear() - 1);
      if (this.compareDate.inRangeMonth(date, start, end)) {
        return x;
      }
      });
    this.filteredStocks = filtered; 
    this.displayStocks = filtered;   
  }

  filterStocksDecade() {
    let filtered = this.stocks.filter(x => {
      let date = new Date(x.latestTradingDay);
      let end = new Date();
      let start = new Date();
      start.setFullYear(start.getFullYear() - 10);
      if (this.compareDate.inRangeMonth(date, start, end)) {
        return x;
      }
      });
    this.filteredStocks = filtered; 
    this.displayStocks = filtered;  
  }

  filterStocksAllTime() {
    this.filteredStocks = this.stocks;
  }

  ngOnInit() {
  }

}
