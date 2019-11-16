import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock/stock.service';

@Component({
  selector: 'sa-stock-prediction',
  templateUrl: './stock-prediction.component.html',
  styleUrls: ['./stock-prediction.component.css']
})
export class StockPredictionComponent implements OnInit {

  constructor(private stockService: StockService) {

  }

  ngOnInit() {
  }

}
