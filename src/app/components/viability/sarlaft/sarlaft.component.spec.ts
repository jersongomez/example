import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SarlaftComponent } from './sarlaft.component';

describe('SarlaftComponent', () => {
  let component: SarlaftComponent;
  let fixture: ComponentFixture<SarlaftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SarlaftComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SarlaftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
