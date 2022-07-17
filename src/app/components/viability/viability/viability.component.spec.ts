import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViabilityComponent } from './viability.component';

describe('ViabilityComponent', () => {
  let component: ViabilityComponent;
  let fixture: ComponentFixture<ViabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViabilityComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
