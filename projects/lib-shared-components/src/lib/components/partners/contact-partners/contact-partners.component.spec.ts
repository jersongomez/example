import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPartnersComponent } from './contact-partners.component';

describe('ContactPartnersComponent', () => {
  let component: ContactPartnersComponent;
  let fixture: ComponentFixture<ContactPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactPartnersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
