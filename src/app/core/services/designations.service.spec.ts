import { TestBed, inject } from '@angular/core/testing';

import { DesignationsService } from './designations.service';

describe('DesignationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DesignationsService]
    });
  });

  it('should be created', inject([DesignationsService], (service: DesignationsService) => {
    expect(service).toBeTruthy();
  }));
});
