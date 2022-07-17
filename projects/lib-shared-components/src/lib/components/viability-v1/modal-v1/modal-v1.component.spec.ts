import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalV1Component } from './modal-v1.component';

describe('ModalV1Component', () => {
  let component: ModalV1Component;
  let fixture: ComponentFixture<ModalV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalV1Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
