import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GlobalQuote } from 'src/app/stock/stock';

@Component({
    selector: 'sa-linechart',
    templateUrl: './line-chart.component.html',    
})
export class LineChartComponent implements OnInit, OnChanges {
    @Input() filteredStocks: GlobalQuote[];

    public lineChartData = [{ data: [], label: "Pick a company" }];
    public lineChartType = 'line';    
    public lineChartLabels = [];
    public lineChartOptions: any = { legend: { display: true, labels: { fontColor: 'black' } }, responsive: true};

    ngOnChanges(changes: SimpleChanges) {
        this.changedStocks(changes.filteredStocks.currentValue);
    }

    changedStocks(currentValue: any) {
        this.filteredStocks = currentValue;
        let newLowData: number[] = [];
        let newHighData: number[] = [];
        let newLabels: string[] = []

        if (this.filteredStocks === undefined) {
            return;
        }
        
        let index = 0;
        for (let i = this.filteredStocks.length - 1; i >= 0; --i) {            
            newLowData[index] = this.filteredStocks[i].low;
            newHighData[index] = this.filteredStocks[i].high;
            let correctDate = new Date(this.filteredStocks[i].latestTradingDay);
            newLabels[index] = correctDate.toDateString();
            index++;
        }
        let newLineChartData = [{ data: newLowData, label: "Low" }, { data: newHighData, label: "high"}];
        this.lineChartData = newLineChartData;
        this.lineChartLabels = newLabels;  
              
    }    

    ngOnInit() {
    }

}