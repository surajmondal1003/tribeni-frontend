import { TestBed, inject } from '@angular/core/testing';

import { PurchaseOrdersService } from './purchase-orders.service';

describe('PurchaseOrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseOrdersService]
    });
  });

  it('should be created', inject([PurchaseOrdersService], (service: PurchaseOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
