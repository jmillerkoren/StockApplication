import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { GlobalQuote } from '../../stock/stock';

@Component({
  selector: 'sa-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

@Input() stocks: GlobalQuote[] = null;

  public barChartOptions = {
    scaleShowVerticalLines: false,    
    responsive: true
  };

  public barChartLabels = ['Open', 'Low', 'High', 'Price'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [];

  public baseChartData = [
    {data: [0, 0, 0, 0], label: 'Pick a company'}    
  ]; 

  ngOnChanges(changes: SimpleChanges) {
    this.stockChange(changes.stocks.currentValue)
  }

  stockChange(changedStock: GlobalQuote[]) {
    console.log(changedStock);
    if (changedStock.length === 0) {
      this.barChartData = this.baseChartData;
      return;
    }
    this.stocks = changedStock;
    let newData = [];
    for (let i = 0; i < changedStock.length; ++i) {
      newData[i] = {data: [changedStock[i].open, changedStock[i].low, changedStock[i].high, changedStock[i].price], label: changedStock[i].company}
    } 
    console.log("Here");    
    this.barChartData = newData;
  }

  constructor() { }

  ngOnInit() {
    
  }

}
