import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudModalV1Component } from './solicitud-modal-v1.component';

describe('SolicitudModalV1Component', () => {
  let component: SolicitudModalV1Component;
  let fixture: ComponentFixture<SolicitudModalV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudModalV1Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudModalV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
