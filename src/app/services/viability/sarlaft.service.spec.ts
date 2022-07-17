import { TestBed } from '@angular/core/testing';

import { SarlaftService } from './sarlaft.service';

describe('SarlaftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SarlaftService = TestBed.get(SarlaftService);
    expect(service).toBeTruthy();
  });
});
