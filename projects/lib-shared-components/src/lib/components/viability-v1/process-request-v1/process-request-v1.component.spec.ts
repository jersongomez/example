import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessRequestV1Component } from './process-request-v1.component';

describe('ProcessRequestV1Component', () => {
  let component: ProcessRequestV1Component;
  let fixture: ComponentFixture<ProcessRequestV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessRequestV1Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessRequestV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
