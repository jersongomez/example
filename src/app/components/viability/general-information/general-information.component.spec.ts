import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StateObservable, Store } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';

import { GeneralInformationComponent } from './general-information.component';

describe('GeneralInformationComponent', () => {
  let component: GeneralInformationComponent;
  let fixture: ComponentFixture<GeneralInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralInformationComponent],
      providers: [KeycloakService, HttpClient, HttpHandler, Store, StateObservable],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInformationComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
