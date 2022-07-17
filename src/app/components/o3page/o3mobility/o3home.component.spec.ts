import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { O3HomeComponent } from './o3home.component';

describe('O3HomeComponent', () => {
  let component: O3HomeComponent;
  let fixture: ComponentFixture<O3HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [O3HomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(O3HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
