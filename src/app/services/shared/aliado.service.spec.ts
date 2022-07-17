import { TestBed } from '@angular/core/testing';

import { AliadoService } from './aliado.service';

describe('AliadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AliadoService = TestBed.get(AliadoService);
    expect(service).toBeTruthy();
  });
});
