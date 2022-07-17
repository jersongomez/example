import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColsanitasHelpComponent } from './colsanitas-help.component';

describe('ColsanitasHelpComponent', () => {
  let component: ColsanitasHelpComponent;
  let fixture: ComponentFixture<ColsanitasHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColsanitasHelpComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColsanitasHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
