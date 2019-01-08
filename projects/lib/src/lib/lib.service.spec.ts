import {TestBed} from '@angular/core/testing';

import {CloudImageService, LibService} from './lib.service';

describe('CloudImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibService = TestBed.get(CloudImageService);
    expect(service).toBeTruthy();
  });
});
