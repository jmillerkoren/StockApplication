import { Component, OnInit } from '@angular/core';
import { GlobalQuote } from '../stock/stock';
import { StockService } from '../stock/stock.service';

@Component({
  selector: 'sa-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  stocks: GlobalQuote[];

  constructor(private stockService: StockService) { }

  getListStocks (company: string) {
    this.stockService.getListStocks(company).subscribe({
      next: result => this.stocks = result
    });
  }
  


  ngOnInit() {
  }

}
