import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechnungspositionDetailDialogComponent } from './rechnungsposition-detail-dialog.component';

describe('RechnungpositionDetailDialogComponent', () => {
  let component: RechnungspositionDetailDialogComponent;
  let fixture: ComponentFixture<RechnungspositionDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechnungspositionDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechnungspositionDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
