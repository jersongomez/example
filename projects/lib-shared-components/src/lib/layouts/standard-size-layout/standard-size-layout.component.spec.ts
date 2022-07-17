import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardSizeLayoutComponent } from './standard-size-layout.component';

describe('StandardSizeLayoutComponent', () => {
  let component: StandardSizeLayoutComponent;
  let fixture: ComponentFixture<StandardSizeLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StandardSizeLayoutComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardSizeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
