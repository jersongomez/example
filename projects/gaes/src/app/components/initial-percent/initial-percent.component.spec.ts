import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialPercentComponent } from './initial-percent.component';

describe('InitialPercentComponent', () => {
  let component: InitialPercentComponent;
  let fixture: ComponentFixture<InitialPercentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InitialPercentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
