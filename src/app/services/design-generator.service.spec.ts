import { TestBed } from '@angular/core/testing';

import { DesignGeneratorService } from './design-generator.service';

describe('DesignGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesignGeneratorService = TestBed.get(DesignGeneratorService);
    expect(service).toBeTruthy();
  });
});
