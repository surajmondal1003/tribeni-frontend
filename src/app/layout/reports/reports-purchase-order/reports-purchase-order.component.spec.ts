import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsPurchaseOrderComponent } from './reports-purchase-order.component';

describe('ReportsPurchaseOrderComponent', () => {
  let component: ReportsPurchaseOrderComponent;
  let fixture: ComponentFixture<ReportsPurchaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsPurchaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
