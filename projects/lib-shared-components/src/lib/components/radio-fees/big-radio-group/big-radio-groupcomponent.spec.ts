import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigRadioGroupComponent } from './big-radio-groupcomponent';

describe('BigRadioGroupComponent', () => {
  let component: BigRadioGroupComponent;
  let fixture: ComponentFixture<BigRadioGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BigRadioGroupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
