import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemparrafoComponent } from './itemparrafo.component';

describe('ItemparrafoComponent', () => {
  let component: ItemparrafoComponent;
  let fixture: ComponentFixture<ItemparrafoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemparrafoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemparrafoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
