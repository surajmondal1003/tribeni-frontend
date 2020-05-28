import { TestBed, inject } from '@angular/core/testing';

import { GrnReverseService } from './grn-reverse.service';

describe('GrnReverseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrnReverseService]
    });
  });

  it('should be created', inject([GrnReverseService], (service: GrnReverseService) => {
    expect(service).toBeTruthy();
  }));
});
