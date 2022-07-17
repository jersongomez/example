import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintComponent } from './print.component';

describe('PrintComponent', () => {
  let component: PrintComponent;
  let fixture: ComponentFixture<PrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrintComponent],
      providers: [HttpClient, HttpHandler],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
