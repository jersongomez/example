import { TestBed } from '@angular/core/testing';

import { ViabilityV1Service } from './viability-v1.service';

describe('ViabilityV1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViabilityV1Service = TestBed.get(ViabilityV1Service);
    expect(service).toBeTruthy();
  });
});
