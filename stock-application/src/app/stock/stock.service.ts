import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GlobalQuote } from './stock';

@Injectable({
    providedIn: 'root'
})
export class StockService {   
    
    private apiKey: string = "TI4UDE5Y8XR939VH"

    constructor(private http: HttpClient) {

    }

    getStocks(company: string): Observable<any> {
        return this.http.get<any>(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${company}&apikey=${this.apiKey}`).pipe(            
            catchError(this.handleError))
    }

    getListStocks(company: string): Observable<GlobalQuote[]> {
        return this.http.get<any>(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${company}&apikey=${this.apiKey}`).pipe(
            
        )
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