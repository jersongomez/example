import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInformationV1Component } from './general-information-v1.component';

describe('GeneralInformationV1Component', () => {
  let component: GeneralInformationV1Component;
  let fixture: ComponentFixture<GeneralInformationV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralInformationV1Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInformationV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
