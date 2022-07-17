import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColsanitasHomeComponent } from './colsanitas-home.component';

describe('ColsanitasHomeComponent', () => {
  let component: ColsanitasHomeComponent;
  let fixture: ComponentFixture<ColsanitasHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColsanitasHomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColsanitasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
