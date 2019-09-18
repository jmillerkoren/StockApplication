import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GlobalQuote } from './stock';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, mapTo, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StockService {    

    constructor(private http: HttpClient) {

    }

    getStocks(): Observable<any> {
        return this.http.get<any>('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=TI4UDE5Y8XR939VH').pipe(
            tap(d => console.log(d)),
            catchError(this.handleError))
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