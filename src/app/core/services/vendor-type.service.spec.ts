import { TestBed, inject } from '@angular/core/testing';

import { VendorTypeService } from './vendor-type.service';

describe('VendorTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendorTypeService]
    });
  });

  it('should be created', inject([VendorTypeService], (service: VendorTypeService) => {
    expect(service).toBeTruthy();
  }));
});
