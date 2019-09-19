import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sa-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,    
    responsive: true
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true

  public barChartData = [
    {data: [65, 79, 56, 76, 67, 80], label: 'Series A'},
    {data: [23, 67, 46, 79, 77, 90], label: 'Series B'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
