import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateOtpV1Component } from './validate-otp-v1.component';

describe('ValidateOtpV1Component', () => {
  let component: ValidateOtpV1Component;
  let fixture: ComponentFixture<ValidateOtpV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValidateOtpV1Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateOtpV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
