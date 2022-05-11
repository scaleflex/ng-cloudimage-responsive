import { TestBed } from '@angular/core/testing';

import { CIService } from './lib.service';

describe('TestService', () => {
  let service: CIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
