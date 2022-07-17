import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlliesComponent } from './add-allies.component';

describe('AddAlliesComponent', () => {
  let component: AddAlliesComponent;
  let fixture: ComponentFixture<AddAlliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAlliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
