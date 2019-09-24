import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { GlobalQuote } from '../../stock/stock';

@Component({
  selector: 'sa-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

@Input() company: string;
@Input() stock: GlobalQuote;
@Input() example: string;


  public barChartOptions = {
    scaleShowVerticalLines: false,    
    responsive: true
  };

  public barChartLabels = ['Open', 'Low', 'High', 'Price'];
  public barChartType = 'bar';
  public barChartLegend = true

  public barChartData = [
    {data: [65, 79, 56], label: 'Series A'}    
  ]

  ngOnChanges(changes: SimpleChanges) {
    this.stockChange(changes.stock.currentValue)
  }

  stockChange(changedStock: GlobalQuote) {
    console.log(changedStock);
    this.stock = changedStock;
    this.barChartData[0].label = changedStock.company;
    this.barChartData[0].data[0] = changedStock.high;
    this.barChartData[0].data[1] = changedStock.low;    
  }

  constructor() { }

  ngOnInit() {
    
  }

}
