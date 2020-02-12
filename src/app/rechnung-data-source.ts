import { IRechnung } from 'shared/IRechnung';
import { DataSource } from '@angular/cdk/table';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { BusinessLogicService } from './business-logic/business-logic.service';
import { catchError } from 'rxjs/operators';

export class RechnungDataSource implements DataSource<IRechnung> {
    private rechnungSubject: BehaviorSubject<IRechnung[]> = new BehaviorSubject([]);
    private errorSubject: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(private businessLogicService: BusinessLogicService) { }

    connect(): Observable<IRechnung[] | readonly IRechnung[]> {
        return this.rechnungSubject.asObservable();
    }

    disconnect(): void {
        this.rechnungSubject.complete();
    }

    getAvailable(): Observable<number> {
        return this.businessLogicService.availableRechnung();
    }

    getError(): Observable<string> {
        return this.errorSubject.asObservable();
    }

    filter(pageIndex: number, pageSize: number): void {
        this.businessLogicService.filterRechnung(pageIndex, pageSize).pipe(
            catchError((error) => {
                this.errorSubject.next(error);
                return of([]);
            })
        ).subscribe((value) => {
            this.rechnungSubject.next(value);
        });
    }
}
