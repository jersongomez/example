import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightHomeLayoutComponent } from './light-home-layout.component';

describe('LightHomeLayoutComponent', () => {
  let component: LightHomeLayoutComponent;
  let fixture: ComponentFixture<LightHomeLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LightHomeLayoutComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightHomeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
