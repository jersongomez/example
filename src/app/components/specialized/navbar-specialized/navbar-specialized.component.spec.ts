import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSpecializedComponent } from './navbar-specialized.component';

describe('NavbarSpecializedComponent', () => {
  let component: NavbarSpecializedComponent;
  let fixture: ComponentFixture<NavbarSpecializedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarSpecializedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSpecializedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
