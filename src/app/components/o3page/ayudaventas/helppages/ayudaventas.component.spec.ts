import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaventasComponent } from './ayudaventas.component';

describe('AyudaventasComponent', () => {
  let component: AyudaventasComponent;
  let fixture: ComponentFixture<AyudaventasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AyudaventasComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudaventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
