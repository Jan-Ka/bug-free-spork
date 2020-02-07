import { IRechnung } from 'shared/IRechnung';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { RechnungService } from './rechnung.service';

export class RechnungDataSource implements DataSource<IRechnung> {
    private sourceSubject: BehaviorSubject<IRechnung[]> = new BehaviorSubject([]);
    private availableSubject: BehaviorSubject<number> = new BehaviorSubject(0);

    private rechnungServiceSubscription: Subscription;
    private availableServiceSubscription: Subscription;

    constructor(private rechnungService: RechnungService) { }

    connect(collectionViewer: CollectionViewer): Observable<IRechnung[] | readonly IRechnung[]> {
        this.rechnungServiceSubscription = this.rechnungService.filter(0, 10).subscribe(value => {
            this.sourceSubject.next(value);
        });

        this.availableServiceSubscription = this.rechnungService.available().subscribe(value => {
            this.availableSubject.next(value);
        });

        return this.sourceSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.rechnungServiceSubscription.unsubscribe();
        this.availableServiceSubscription.unsubscribe();

        this.sourceSubject.complete();
    }

    available(): Observable<number> {
        return this.availableSubject.asObservable();
    }
}
