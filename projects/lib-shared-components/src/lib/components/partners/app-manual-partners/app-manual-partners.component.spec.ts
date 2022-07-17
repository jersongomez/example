import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppManualPartnersComponent } from './app-manual-partners.component';

describe('AppManualPartnersComponent', () => {
  let component: AppManualPartnersComponent;
  let fixture: ComponentFixture<AppManualPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppManualPartnersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppManualPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
