import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { GlobalQuote } from '../../stock/stock';

@Component({
  selector: 'sa-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

@Input() stock: GlobalQuote;

  public barChartOptions = {
    scaleShowVerticalLines: false,    
    responsive: true
  };

  public barChartLabels = ['Open', 'Low', 'High', 'Price'];
  public barChartType = 'bar';
  public barChartLegend = true

  public barChartData = [
    {data: [65, 79, 56], label: 'Pick a company'}    
  ]

  ngOnChanges(changes: SimpleChanges) {
    this.stockChange(changes.stock.currentValue)
  }

  stockChange(changedStock: GlobalQuote) {
    console.log(changedStock);
    this.stock = changedStock;
    let newData = [{data: [changedStock.open, changedStock.low, changedStock.high, changedStock.price], label: changedStock.company}];
    this.barChartData = newData;
  }

  constructor() { }

  ngOnInit() {
    
  }

}
