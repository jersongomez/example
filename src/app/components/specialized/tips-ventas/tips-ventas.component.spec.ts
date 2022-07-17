import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsVentasComponent } from './tips-ventas.component';

describe('TipsVentasComponent', () => {
  let component: TipsVentasComponent;
  let fixture: ComponentFixture<TipsVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TipsVentasComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
