import { Component } from '@angular/core';
import { GlobalQuote } from './stock';
import { StockService } from './stock.service';

@Component({
  selector: 'sa-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  stocks: GlobalQuote[] = [];

  clickCompany(company: string) {
    this.stockService.getStocks(company).subscribe({
      next: result => {
        let newStocks = [];
        this.stocks.map(item => newStocks.push(item));
        newStocks.push(result);
        this.stocks = newStocks;
      }
    });
  }

  Test(e, company) {
    if (e.currentTarget.checked) {
      this.clickCompany(company);
    }
    else {
      let stocksRemoved = this.stocks.filter(x => x.company !== company);
      this.stocks = stocksRemoved;
    }
  }

  constructor(private stockService: StockService) { }
}
