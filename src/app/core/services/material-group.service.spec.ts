import { TestBed, inject } from '@angular/core/testing';

import { MaterialGroupService } from './material-group.service';

describe('MaterialGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialGroupService]
    });
  });

  it('should be created', inject([MaterialGroupService], (service: MaterialGroupService) => {
    expect(service).toBeTruthy();
  }));
});
