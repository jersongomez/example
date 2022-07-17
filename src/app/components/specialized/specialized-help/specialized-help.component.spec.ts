import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializedHelpComponent } from './specialized-help.component';

describe('SpecializedHelpComponent', () => {
  let component: SpecializedHelpComponent;
  let fixture: ComponentFixture<SpecializedHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpecializedHelpComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializedHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
