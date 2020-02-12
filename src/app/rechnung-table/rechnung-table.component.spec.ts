import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechnungTableComponent } from './rechnung-table.component';

describe('RechnungTableComponent', () => {
  let component: RechnungTableComponent;
  let fixture: ComponentFixture<RechnungTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechnungTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechnungTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
