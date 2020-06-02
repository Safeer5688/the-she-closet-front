import { TestBed } from '@angular/core/testing';

import { PlagCheckerService } from './plag-checker.service';

describe('PlagCheckerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlagCheckerService = TestBed.get(PlagCheckerService);
    expect(service).toBeTruthy();
  });
});
