import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LieferstatusTableComponent } from './lieferstatus-table.component';

describe('LieferstatusTableComponent', () => {
  let component: LieferstatusTableComponent;
  let fixture: ComponentFixture<LieferstatusTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LieferstatusTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LieferstatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
