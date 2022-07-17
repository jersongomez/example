import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigRadioAmountsComponent } from './big-radio-amounts.component';

describe('BigRadioAmountsComponent', () => {
  let component: BigRadioAmountsComponent;
  let fixture: ComponentFixture<BigRadioAmountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BigRadioAmountsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigRadioAmountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
