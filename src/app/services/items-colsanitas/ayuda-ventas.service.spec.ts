import { TestBed } from '@angular/core/testing';

import { AyudaVentasServiceColsanitas } from './ayuda-ventas.service';

describe('AyudaVentasServiceColsanitas', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AyudaVentasServiceColsanitas = TestBed.get(AyudaVentasServiceColsanitas);
    expect(service).toBeTruthy();
  });
});
