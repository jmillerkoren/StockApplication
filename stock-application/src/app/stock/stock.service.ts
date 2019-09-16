import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IStock } from './stock';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StockService {    

    constructor(private http: HttpClient) {

    }

    getStocks(): Observable<IStock[]> {
        return this.http.get<IStock[]>('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=TI4UDE5Y8XR939VH').pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errMsg = '';
        if (err.error instanceof ErrorEvent) {
            errMsg = `An error occurred: ${err.error.message}`;
        }
        else {
            errMsg = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errMsg);
        return throwError(errMsg);
    }



}