import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsPurchaseRequisitionComponent } from './reports-purchase-requisition.component';

describe('ReportsPurchaseRequisitionComponent', () => {
  let component: ReportsPurchaseRequisitionComponent;
  let fixture: ComponentFixture<ReportsPurchaseRequisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsPurchaseRequisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsPurchaseRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
