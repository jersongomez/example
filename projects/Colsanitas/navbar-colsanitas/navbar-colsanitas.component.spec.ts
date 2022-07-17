import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarColsanitasComponent } from './navbar-colsanitas.component';

describe('NavbarColsanitasComponent', () => {
  let component: NavbarColsanitasComponent;
  let fixture: ComponentFixture<NavbarColsanitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarColsanitasComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarColsanitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
