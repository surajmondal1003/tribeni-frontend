import { TestBed, inject } from '@angular/core/testing';

import { TermsConditionService } from './terms-condition.service';

describe('TermsConditionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TermsConditionService]
    });
  });

  it('should be created', inject([TermsConditionService], (service: TermsConditionService) => {
    expect(service).toBeTruthy();
  }));
});
