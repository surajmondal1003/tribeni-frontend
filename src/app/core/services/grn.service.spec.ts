import { TestBed, inject } from '@angular/core/testing';

import { GrnService } from './grn.service';

describe('GrnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrnService]
    });
  });

  it('should be created', inject([GrnService], (service: GrnService) => {
    expect(service).toBeTruthy();
  }));
});
