import { TestBed } from '@angular/core/testing';

import { AyudaVentasService } from './ayuda-ventas.service';

describe('AyudaVentasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AyudaVentasService = TestBed.get(AyudaVentasService);
    expect(service).toBeTruthy();
  });
});
