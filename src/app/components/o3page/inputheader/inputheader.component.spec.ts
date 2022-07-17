import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputheaderComponent } from './inputheader.component';

describe('InputheaderComponent', () => {
  let component: InputheaderComponent;
  let fixture: ComponentFixture<InputheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputheaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
