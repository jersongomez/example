import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTipPartnersComponent } from './sales-tip-partners.component';

describe('SalesTipPartnersComponent', () => {
  let component: SalesTipPartnersComponent;
  let fixture: ComponentFixture<SalesTipPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalesTipPartnersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTipPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
