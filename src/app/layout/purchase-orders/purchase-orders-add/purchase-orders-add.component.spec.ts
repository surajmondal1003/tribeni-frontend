import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdersAddComponent } from './purchase-orders-add.component';

describe('PurchaseOrdersAddComponent', () => {
  let component: PurchaseOrdersAddComponent;
  let fixture: ComponentFixture<PurchaseOrdersAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrdersAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
