import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRequestPartnersComponent } from './item-request-partners.component';

describe('ItemRequestPartnersComponent', () => {
  let component: ItemRequestPartnersComponent;
  let fixture: ComponentFixture<ItemRequestPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemRequestPartnersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRequestPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
