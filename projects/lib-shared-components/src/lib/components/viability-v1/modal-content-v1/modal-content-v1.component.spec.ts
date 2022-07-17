import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContentV1Component } from './modal-content-v1.component';

describe('ModalContentV1Component', () => {
  let component: ModalContentV1Component;
  let fixture: ComponentFixture<ModalContentV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalContentV1Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContentV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
