import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaVersionComponent } from './moda-version.component';

describe('ModaVersionComponent', () => {
  let component: ModaVersionComponent;
  let fixture: ComponentFixture<ModaVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
