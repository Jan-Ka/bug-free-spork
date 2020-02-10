import { IRechnung } from 'shared/IRechnung';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { BusinessLogicService } from './business-logic/business-logic.service';

export class RechnungDataSource implements DataSource<IRechnung> {
    private sourceSubject: BehaviorSubject<IRechnung[]> = new BehaviorSubject([]);
    private availableSubject: BehaviorSubject<number> = new BehaviorSubject(0);

    private rechnungServiceSubscription: Subscription;
    private availableServiceSubscription: Subscription;

    constructor(private businessLogicService: BusinessLogicService) { }

    connect(collectionViewer: CollectionViewer): Observable<IRechnung[] | readonly IRechnung[]> {
        this.rechnungServiceSubscription = this.businessLogicService.filterRechnung(0, 10).subscribe(value => {
            this.sourceSubject.next(value);
        });

        this.availableServiceSubscription = this.businessLogicService.availableRechnung().subscribe(value => {
            this.availableSubject.next(value);
        });

        return this.sourceSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.rechnungServiceSubscription.unsubscribe();
        this.availableServiceSubscription.unsubscribe();

        this.sourceSubject.complete();
    }

    filter(pageIndex: number, pageSize: number): void {
        this.businessLogicService.filterRechnung(pageIndex, pageSize);
    }

    available(): Observable<number> {
        return this.availableSubject.asObservable();
    }
}
