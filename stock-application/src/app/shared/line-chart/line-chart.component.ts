import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GlobalQuote } from 'src/app/stock/stock';

@Component({
    selector: 'sa-linechart',
    templateUrl: './line-chart.component.html',    
})
export class LineChartComponent implements OnInit, OnChanges {
    @Input() stocks: GlobalQuote[];

    public lineChartData = [{ data: [], label: "Pick a company" }];
    public lineChartType = 'line';    
    public lineChartLabels = [];
    public lineChartOptions: any = { legend: { display: true, labels: { fontColor: 'black' } }};

    ngOnChanges(changes: SimpleChanges) {
        this.changedStocks(changes.stocks.currentValue);
    }

    changedStocks(currentValue: any) {
        this.stocks = currentValue;
        let newLowData: number[] = [];
        let newHighData: number[] = [];
        let newLabels: string[] = []

        if (this.stocks === undefined) {
            return;
        }
        
        let index = 0;
        for (let i = this.stocks.length - 1; i >= 0; --i) {            
            newLowData[index] = this.stocks[i].low;
            newHighData[index] = this.stocks[i].high;
            newLabels[index] = this.stocks[i].latestTradingDay;
            index++;
        }
        let newLineChartData = [{ data: newLowData, label: "Low" }, { data: newHighData, label: "high"}];
        this.lineChartData = newLineChartData;
        this.lineChartLabels = newLabels;        
    }

    ngOnInit() {
    }

}