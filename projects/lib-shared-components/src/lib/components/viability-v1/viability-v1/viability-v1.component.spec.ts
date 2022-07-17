import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViabilityV1Component } from './viability-v1.component';

describe('ViabilityV1Component', () => {
  let component: ViabilityV1Component;
  let fixture: ComponentFixture<ViabilityV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViabilityV1Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViabilityV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
