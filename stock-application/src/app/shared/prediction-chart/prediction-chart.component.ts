import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'sa-prediction-chart',
  templateUrl: './prediction-chart.component.html',
  styleUrls: ['./prediction-chart.component.css']
})
export class PredictionChartComponent implements OnInit, OnChanges {

  @Input() predictedStocks: number[];
  public predictionChartLabels = [];
  public predictionChartData = [{ data: [], label: "Predict Stocks" }];
  public predictionChartOptions: any = { legend: { display: true, labels: { fontColor: 'black' } }, responsive: true};
  public predictionChartType = "line";

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.predictStocks(changes.predictedStocks.currentValue);
  }

  predictStocks(predictedStocks: number[]) {
    this.predictedStocks = predictedStocks;
    let newLabels: string[] = [];

    if (this.predictedStocks === undefined) {
      return;
    }
    this.predictionChartData = [{data: predictedStocks, label: "Predicted Stocks"}];
    for (let i = 0; i < predictedStocks.length; i++) {
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      newLabels.push(currentDate.toDateString());
    }
    this.predictionChartLabels = newLabels;
    console.log(newLabels);
  }

  ngOnInit() {
  }

}
