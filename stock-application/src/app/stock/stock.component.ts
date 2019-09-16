import { Component, OnInit } from '@angular/core';
import { IStock } from './stock';
import { StockService } from './stock.service';

@Component({
  selector: 'sa-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stocks: IStock;
  

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getStocks().subscribe({
      next: stocks => this.stocks = stocks
    })
  }

}
