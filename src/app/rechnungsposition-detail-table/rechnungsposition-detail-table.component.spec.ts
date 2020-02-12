import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechnungspositionDetailTableComponent } from './rechnungsposition-detail-table.component';

describe('RechnungspositionDetailTableComponent', () => {
  let component: RechnungspositionDetailTableComponent;
  let fixture: ComponentFixture<RechnungspositionDetailTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechnungspositionDetailTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechnungspositionDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
