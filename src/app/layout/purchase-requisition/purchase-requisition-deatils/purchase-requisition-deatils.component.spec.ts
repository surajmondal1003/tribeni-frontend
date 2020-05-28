import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequisitionDeatilsComponent } from './purchase-requisition-deatils.component';

describe('PurchaseRequisitionDeatilsComponent', () => {
  let component: PurchaseRequisitionDeatilsComponent;
  let fixture: ComponentFixture<PurchaseRequisitionDeatilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequisitionDeatilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequisitionDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
