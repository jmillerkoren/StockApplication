import { Component, OnInit, Input } from '@angular/core';
import {GlobalQuote} from '../../stock/stock';

@Component({
  selector: 'sa-prediction-chart',
  templateUrl: './prediction-chart.component.html',
  styleUrls: ['./prediction-chart.component.css']
})
export class PredictionChartComponent implements OnInit {

  @Input() predictedStocks: GlobalQuote[];

  constructor() { }

  ngOnInit() {
  }

}
