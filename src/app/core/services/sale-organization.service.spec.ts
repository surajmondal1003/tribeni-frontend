import { TestBed, inject } from '@angular/core/testing';

import { SaleOrganizationService } from './sale-organization.service';

describe('SaleOrganizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaleOrganizationService]
    });
  });

  it('should be created', inject([SaleOrganizationService], (service: SaleOrganizationService) => {
    expect(service).toBeTruthy();
  }));
});
