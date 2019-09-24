import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StockService {    

    constructor(private http: HttpClient) {

    }

    getStocks(company: string): Observable<any> {
        return this.http.get<any>(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${company}&apikey=TI4UDE5Y8XR939VH`).pipe(            
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