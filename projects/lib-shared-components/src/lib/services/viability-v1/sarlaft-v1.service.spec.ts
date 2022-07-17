import { TestBed } from '@angular/core/testing';

import { SarlaftV1Service } from './sarlaft-v1.service';

describe('SarlaftV1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SarlaftV1Service = TestBed.get(SarlaftV1Service);
    expect(service).toBeTruthy();
  });
});
