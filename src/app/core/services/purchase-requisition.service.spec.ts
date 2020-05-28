import { TestBed, inject } from '@angular/core/testing';

import { PurchaseRequisitionService } from './purchase-requisition.service';

describe('PurchaseRequisitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseRequisitionService]
    });
  });

  it('should be created', inject([PurchaseRequisitionService], (service: PurchaseRequisitionService) => {
    expect(service).toBeTruthy();
  }));
});
