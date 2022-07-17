import { TestBed } from '@angular/core/testing';

import { GeneralInformationV1Service } from './general-information-v1.service';

describe('GeneralInformationV1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralInformationV1Service = TestBed.get(GeneralInformationV1Service);
    expect(service).toBeTruthy();
  });
});
