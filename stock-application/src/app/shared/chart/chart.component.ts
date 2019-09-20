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

  public barChartLabels = ['h', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true

  public barChartData = [
    {data: [65, 79, 56, 76, 67, 80], label: 'Series A'},
    {data: [23, 67, 46, 79, 77, 90], label: 'Series B'}
  ]

  ngOnChanges(changes: SimpleChanges) {
    this.stockChange(changes.stock.currentValue)
  }

  stockChange(changedStock: GlobalQuote) {
    this.stock = changedStock;
    console.log(this.stock.low);
    this.barChartLabels[0] = this.stock.low.toString();
  }

  constructor() { }

  ngOnInit() {
    this.barChartLabels[0] = this.stock.low.toString();
  }

}
