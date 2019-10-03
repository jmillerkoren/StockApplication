import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { GlobalQuote } from './stock';
import { LocalStocks } from './local-stock';

@Injectable({
    providedIn: 'root'
})
export class StockService {

    private apiKey: string = "TI4UDE5Y8XR939VH"

    constructor(private http: HttpClient) { }

    getStocks(company: string): Observable<GlobalQuote> {
        return this.http.get<any>(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${company}&apikey=${this.apiKey}`).pipe(
            map(result => {
                let newStock: GlobalQuote = {
                    company: result["Global Quote"]["01. symbol"],
                    low: result['Global Quote']['04. low'],
                    high: result['Global Quote']['03. high'],
                    volume: result['Global Quote']['06. volume'],
                    latestTradingDay: result['Global Quote']['07. latest trading day'],
                    open: result['Global Quote']['02. open'],
                    change: 0,
                    changePercent: 0,
                    price: result['Global Quote']['05. price'],
                    previousClose: "string"
                };
                return newStock;
            }),
            catchError(this.handleError))
    }

    getListStocks(company: string): Observable<GlobalQuote[]> {
        let stockList: GlobalQuote[] = [];   
        let local: LocalStocks = JSON.parse(localStorage.getItem(`stock-list-${company}`))                      
        if (local !== null && local.stocks.length !== 0 && this.validStock(local)) {            
            stockList = local.stocks;
            return of(stockList);                  
        }

        return this.http.get<any>(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${company}&apikey=${this.apiKey}`).pipe(
            map(result => {
                
                let stockJson = result["Weekly Time Series"];                
                for (let value in stockJson) {
                    let stock: GlobalQuote = this.mapNewStock(stockJson, value);                    
                    stockList.push(stock);                  
                }  
                let currrentDate = new Date();                
                let localStocks: LocalStocks = {
                    stocks: stockList,
                    dateRetrieved: currrentDate  
                };
                localStorage.setItem(`stock-list-${company}`, JSON.stringify(localStocks));                    
                return stockList;
            }),
            catchError(this.handleError))
    }
    
    private validStock(localStocks: LocalStocks): boolean {
        localStocks.dateRetrieved = new Date(localStocks.dateRetrieved); 
        let currentDate: Date = new Date();             
        if ((localStocks.dateRetrieved.getDay() + 1) === (currentDate.getDay())) {
            return false;
        }
        return true;        
    }

    private mapNewStock(result: any, property: string): GlobalQuote  {
        let stock: GlobalQuote = {
            company: 'MSFT',
            open: result[property]["1. open"],
            high: result[property]["2. high"],
            low: result[property]["3. low"],
            price: 0,
            volume: result[property]["5. volume"],
            latestTradingDay: property,
            previousClose: '',
            change: 0,
            changePercent: 0
        }
        return stock;
    }

    private handleError(err: HttpErrorResponse) {
        let errMsg = '';
        if (err.error instanceof ErrorEvent) {
            errMsg = `An error occurred: ${err.error.message}`;
        }
        else {
            errMsg = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        return throwError(errMsg);
    }



}