import { TestBed, inject } from '@angular/core/testing';

import { PurchaseInvoiceService } from './purchase-invoice.service';

describe('PurchaseInvoiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseInvoiceService]
    });
  });

  it('should be created', inject([PurchaseInvoiceService], (service: PurchaseInvoiceService) => {
    expect(service).toBeTruthy();
  }));
});
