import { TestBed } from '@angular/core/testing';

import { GeneralInformationService } from './general-information.service';

describe('GeneralInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralInformationService = TestBed.get(GeneralInformationService);
    expect(service).toBeTruthy();
  });
});
