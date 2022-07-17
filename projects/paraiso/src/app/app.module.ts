import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LibSharedComponentsModule } from 'projects/lib-shared-components/src/public-api';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';

import es from '@angular/common/locales/es';
import { BusinessHelpComponent } from './components/business-help/business-help.component';
import { ModalAllietsModule } from 'projects/lib-shared-components/src/lib/components/allies-store/allies-store.module';

registerLocaleData(es);

@NgModule({
  declarations: [AppComponent, HomeComponent, BusinessHelpComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    LibSharedComponentsModule,
    //  ModalAllietsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

@NgModule({})
export class ParaisoSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [],
    };
  }
}
