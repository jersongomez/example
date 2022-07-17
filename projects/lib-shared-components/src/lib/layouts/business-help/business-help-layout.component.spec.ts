import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHelpLayoutComponent } from './business-help-layout.component';

describe('BusinessHelpComponent', () => {
  let component: BusinessHelpLayoutComponent;
  let fixture: ComponentFixture<BusinessHelpLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessHelpLayoutComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessHelpLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
