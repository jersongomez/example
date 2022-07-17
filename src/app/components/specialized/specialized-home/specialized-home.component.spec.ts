import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializedHomeComponent } from './specialized-home.component';

describe('SpecializedHomeComponent', () => {
  let component: SpecializedHomeComponent;
  let fixture: ComponentFixture<SpecializedHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpecializedHomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializedHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
