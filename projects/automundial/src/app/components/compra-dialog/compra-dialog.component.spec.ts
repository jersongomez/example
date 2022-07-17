import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraDialogComponent } from './compra-dialog.component';

describe('CompraDialogComponent', () => {
  let component: CompraDialogComponent;
  let fixture: ComponentFixture<CompraDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompraDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
