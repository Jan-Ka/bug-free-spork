import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechnungpositionDetailDialogComponent } from './rechnungposition-detail-dialog.component';

describe('RechnungpositionDetailDialogComponent', () => {
  let component: RechnungpositionDetailDialogComponent;
  let fixture: ComponentFixture<RechnungpositionDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechnungpositionDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechnungpositionDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
