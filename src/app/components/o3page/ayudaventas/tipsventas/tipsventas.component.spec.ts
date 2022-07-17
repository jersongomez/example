import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsventasComponent } from './tipsventas.component';

describe('TipsventasComponent', () => {
  let component: TipsventasComponent;
  let fixture: ComponentFixture<TipsventasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TipsventasComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
