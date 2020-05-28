import { TestBed, inject } from '@angular/core/testing';

import { GstRatesService } from './gst-rates.service';

describe('GstRatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GstRatesService]
    });
  });

  it('should be created', inject([GstRatesService], (service: GstRatesService) => {
    expect(service).toBeTruthy();
  }));
});
