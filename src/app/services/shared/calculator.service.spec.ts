import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    expect(service).toBeTruthy();
  });
});
