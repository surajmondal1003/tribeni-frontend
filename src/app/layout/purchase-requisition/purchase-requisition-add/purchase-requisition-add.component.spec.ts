import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequisitionAddComponent } from './purchase-requisition-add.component';

describe('PurchaseRequisitionAddComponent', () => {
  let component: PurchaseRequisitionAddComponent;
  let fixture: ComponentFixture<PurchaseRequisitionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequisitionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequisitionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
