import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { TraceabilityFilterComponent } from './components/traceability-filter/traceability-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material';
import { DatePipe } from '@angular/common';
import { NavPathComponent } from './components/nav-path/nav-path/nav-path.component';
import { SideMenuComponent } from './components/side-menu/side-menu/side-menu.component';
import { KeycloakService } from 'keycloak-angular';
import { ParametersComponent } from './components/parameters/parameters.component';
import { SignedDocumentsComponent } from './components/signed-documents/signed-documents.component';
import { TraceabilityDateComponent } from './components/traceability-date/traceability-date.component';
import { VersionModule } from './utils/moda-version/version.module';
import { IdentityDateComponent } from './components/identity-date/identity-date.component';
import { ObjectInitializer } from 'projects/backoffice/src/app/models/Identity/ObjectInitializer';
import { AddAlliesComponent } from './components/add-allies/add-allies.component';

const declarations = [
  AppComponent,
  HomeComponent,
  TraceabilityFilterComponent,
  NavPathComponent,
  SideMenuComponent,
  ParametersComponent,
  SignedDocumentsComponent,
  TraceabilityDateComponent,
  IdentityDateComponent,
  AddAlliesComponent
];

@NgModule({
  declarations: declarations,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    VersionModule
  ],
  providers: [
    DatePipe,
    ObjectInitializer,
    KeycloakService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

@NgModule({})
export class BackOfficeSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [],
    };
  }
}
