import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock/stock.service';
import {GlobalQuote} from '../stock/stock';

@Component({
  selector: 'sa-stock-prediction',
  templateUrl: './stock-prediction.component.html',
  styleUrls: ['./stock-prediction.component.css']
})
export class StockPredictionComponent implements OnInit {

  predictedStocks = [];

  constructor(private stockService: StockService) {

  }

  predictStocks(company: string) {
    // get 14 previous stocks values
    let prevStocks = this.getPrevStocks();
    // call backend to predict, assign to predictedStocks
    this.stockService.stockPredictions(prevStocks).subscribe({next: result => this.predictedStocks = result})
  }

  private getPrevStocks(): GlobalQuote[] {
    let prev: GlobalQuote[];
    this.stockService.getListStocks("MSFT").subscribe({
      next: result => prev = result
    });
    return prev.slice(0, 14);
  }

  ngOnInit() {
  }

}
