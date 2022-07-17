import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceabilityDateComponent } from './traceability-date.component';

describe('TraceabilityDateComponent', () => {
  let component: TraceabilityDateComponent;
  let fixture: ComponentFixture<TraceabilityDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraceabilityDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceabilityDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
