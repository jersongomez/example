import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudModalComponent } from './solicitud-modal.component';

describe('SolicitudModalComponent', () => {
  let component: SolicitudModalComponent;
  let fixture: ComponentFixture<SolicitudModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
