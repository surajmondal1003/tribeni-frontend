import { TestBed, inject } from '@angular/core/testing';

import { SaleGroupService } from './sale-group.service';

describe('SaleGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaleGroupService]
    });
  });

  it('should be created', inject([SaleGroupService], (service: SaleGroupService) => {
    expect(service).toBeTruthy();
  }));
});
