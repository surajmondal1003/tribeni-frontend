import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersDetailsComponent } from './purchase-orders-details.component';

describe('PurchaseOrdersDetailsComponent', () => {
  let component: PurchaseOrdersDetailsComponent;
  let fixture: ComponentFixture<PurchaseOrdersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
