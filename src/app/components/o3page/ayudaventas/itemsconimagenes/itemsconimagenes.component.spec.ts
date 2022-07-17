import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsconimagenesComponent } from './itemsconimagenes.component';

describe('ItemsconimagenesComponent', () => {
  let component: ItemsconimagenesComponent;
  let fixture: ComponentFixture<ItemsconimagenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsconimagenesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsconimagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
