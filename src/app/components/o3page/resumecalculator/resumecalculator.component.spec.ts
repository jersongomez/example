import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumecalculatorComponent } from './resumecalculator.component';

describe('ResumecalculatorComponent', () => {
  let component: ResumecalculatorComponent;
  let fixture: ComponentFixture<ResumecalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResumecalculatorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumecalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
