import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { GlobalQuote } from './stock';
import { LocalStocks } from './local-stocks';
import { LocalStock } from './local-stock';

@Injectable({
    providedIn: 'root'
})
export class StockService {

    private apiKey: string = "TI4UDE5Y8XR939VH"

    constructor(private http: HttpClient) { }

    getStocks(company: string): Observable<GlobalQuote> {
        let newStock: GlobalQuote;
        let local: LocalStock = JSON.parse(localStorage.getItem(`stock-${company}`));
        if (local != undefined && this.validStock(local)) {
            newStock = local.stock
            return of(newStock);
        }
        return this.http.get<any>(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${company}&apikey=${this.apiKey}`).pipe(
            map(result => {
                  newStock = {
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
                local = {
                    stock: newStock,
                    dateRetrieved: new Date()
                }
                localStorage.setItem(`stock-${company}`, JSON.stringify(local));                      
                return newStock;
            }),
            catchError(this.handleError))
    }

    getListStocks(company: string): Observable<GlobalQuote[]> {
        let stockList: GlobalQuote[] = [];   
        let local: LocalStocks = JSON.parse(localStorage.getItem(`stock-list-${company}`))                      
        if (local !== null && local.stocks.length !== 0 && this.validStocks(local)) {            
            stockList = local.stocks;
            return of(stockList);                  
        }

        return this.http.get<any>(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${company}&apikey=${this.apiKey}`).pipe(
            map(result => {
                
                let stockJson = result["Weekly Time Series"];
                let company: string = result["Meta Data"]["2. Symbol"];                
                for (let value in stockJson) {
                    let stock: GlobalQuote = this.mapNewStock(stockJson, value, company);                    
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

    callApi(stock: GlobalQuote): Observable<any> {
        return this.http.post('http://127.0.0.1:5000/stock-app/api/v1.0/calculate', JSON.stringify(stock));
    }

    // Look to refactor how local stock/stocks are structured.
    private validStock(localStock: LocalStock): boolean {
        localStock.dateRetrieved = new Date(localStock.dateRetrieved)
        let currentDate: Date = new Date();
        let dayAfterRetrieved: Date = new Date(localStock.dateRetrieved)
        dayAfterRetrieved.setDate(localStock.dateRetrieved.getDate() + 1);  
        if (dayAfterRetrieved <= currentDate) {
            return false;
        }
        return true;
    }

    private validStocks(localStocks: LocalStocks): boolean {
        localStocks.dateRetrieved = new Date(localStocks.dateRetrieved)
        let currentDate: Date = new Date();
        let dayAfterRetrieved: Date = new Date(localStocks.dateRetrieved)
        dayAfterRetrieved.setDate(localStocks.dateRetrieved.getDate() + 1);  
        if (dayAfterRetrieved <= currentDate) {
            return false;
        }
        return true;       
    }

    private mapNewStock(result: any, property: string, company: string): GlobalQuote  {
        let stock: GlobalQuote = {
            company: company,
            open: result[property]["1. open"],
            high: result[property]["2. high"],
            low: result[property]["3. low"],
            price: 0,
            volume: result[property]["5. volume"],
            latestTradingDay: new Date(property),
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