import { TestBed } from '@angular/core/testing';

import { HelpSalesService } from './help-sales.service';

describe('HelpSalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelpSalesService = TestBed.get(HelpSalesService);
    expect(service).toBeTruthy();
  });
});
