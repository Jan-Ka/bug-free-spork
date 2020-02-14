import { BusinessLogicService } from '../../business-logic/business-logic.service';
import { catchError, finalize } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { IRechnung } from 'shared/IRechnung';
import { Observable, BehaviorSubject, of, interval } from 'rxjs';

export class RechnungDataSource implements DataSource<IRechnung> {
    private rechnungSubject: BehaviorSubject<IRechnung[]> = new BehaviorSubject([]);
    private errorSubject: BehaviorSubject<string> = new BehaviorSubject(null);
    private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);

    constructor(private businessLogicService: BusinessLogicService) { }

    connect(): Observable<IRechnung[] | readonly IRechnung[]> {
        return this.rechnungSubject.asObservable();
    }

    disconnect(): void {
        this.rechnungSubject.complete();
        this.errorSubject.complete();
        this.loadingSubject.complete();
    }

    getAvailable(): Observable<number> {
        return this.businessLogicService.availableRechnung();
    }

    getError(): Observable<string> {
        return this.errorSubject.asObservable();
    }

    getLoading(): Observable<boolean> {
        return this.loadingSubject.asObservable();
    }

    filter(pageIndex: number, pageSize: number): void {
        this.loadingSubject.next(true);

        this.businessLogicService.filterRechnung(pageIndex, pageSize).pipe(
            catchError((error) => {
                this.loadingSubject.next(false);
                this.errorSubject.next(error);
                return of([]);
            })
        ).subscribe((value) => {
            this.loadingSubject.next(false);
            this.rechnungSubject.next(value);
        });
    }
}
