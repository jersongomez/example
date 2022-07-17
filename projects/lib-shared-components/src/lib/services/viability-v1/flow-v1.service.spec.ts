import { TestBed } from '@angular/core/testing';

import { FlowV1Service } from './flow-v1.service';

describe('FlowV1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlowV1Service = TestBed.get(FlowV1Service);
    expect(service).toBeTruthy();
  });
});
