import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SarlaftV1Component } from './sarlaft-v1.component';

describe('SarlaftV1Component', () => {
  let component: SarlaftV1Component;
  let fixture: ComponentFixture<SarlaftV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SarlaftV1Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SarlaftV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
