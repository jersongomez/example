import { TestBed } from '@angular/core/testing';

import { CuotasService } from './cuotas.service';

describe('CuotasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuotasService = TestBed.get(CuotasService);
    expect(service).toBeTruthy();
  });
});
