import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesItemsComponent } from './images-items.component';

describe('ImagesItemsComponent', () => {
  let component: ImagesItemsComponent;
  let fixture: ComponentFixture<ImagesItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesItemsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
