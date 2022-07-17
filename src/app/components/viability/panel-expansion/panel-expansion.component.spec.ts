import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelExpansionComponent } from './panel-expansion.component';

describe('PanelExpansionComponent', () => {
  let component: PanelExpansionComponent;
  let fixture: ComponentFixture<PanelExpansionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PanelExpansionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
