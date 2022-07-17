import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDetailPartnersComponent } from './print-detail-partners.component';

describe('PrintDetailPartnersComponent', () => {
  let component: PrintDetailPartnersComponent;
  let fixture: ComponentFixture<PrintDetailPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrintDetailPartnersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintDetailPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
