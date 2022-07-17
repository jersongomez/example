import { TestBed } from '@angular/core/testing';

import { ValidationV1Service } from './validation-v1.service';

describe('ValidationV1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidationV1Service = TestBed.get(ValidationV1Service);
    expect(service).toBeTruthy();
  });
});
