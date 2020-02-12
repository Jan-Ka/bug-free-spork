import { IRechnung } from 'shared/IRechnung';
import { DataSource } from '@angular/cdk/table';
import { Observable, BehaviorSubject } from 'rxjs';
import { BusinessLogicService } from './business-logic/business-logic.service';

export class RechnungDataSource implements DataSource<IRechnung> {
    private rechnungSubject: BehaviorSubject<IRechnung[]> = new BehaviorSubject([]);

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

    filter(pageIndex: number, pageSize: number): void {
        this.businessLogicService.filterRechnung(pageIndex, pageSize).subscribe((value) => {
            this.rechnungSubject.next(value);
        });
    }
}
