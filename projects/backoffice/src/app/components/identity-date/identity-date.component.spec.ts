import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityDateComponent } from './identity-date.component';

describe('IdentityDateComponent', () => {
  let component: IdentityDateComponent;
  let fixture: ComponentFixture<IdentityDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
