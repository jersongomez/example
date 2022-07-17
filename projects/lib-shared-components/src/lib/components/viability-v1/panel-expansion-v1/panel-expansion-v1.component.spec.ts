import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelExpansionV1Component } from './panel-expansion-v1.component';

describe('PanelExpansionV1Component', () => {
  let component: PanelExpansionV1Component;
  let fixture: ComponentFixture<PanelExpansionV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PanelExpansionV1Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelExpansionV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
