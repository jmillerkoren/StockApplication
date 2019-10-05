import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CompareDate {
    inRangeMonth(date: Date, start: Date, end: Date): boolean {
        let totalMonths: number  = (date.getFullYear() * 12) + date.getMonth();
        let totalMonthsStart: number = (start.getFullYear() * 12) + start.getMonth();
        let totalMonthsEnd: number = (end.getFullYear() * 12) + end.getMonth();        
        if (totalMonths > totalMonthsEnd || totalMonths < totalMonthsStart) {
            return false;
        }
        return true;
    }
}