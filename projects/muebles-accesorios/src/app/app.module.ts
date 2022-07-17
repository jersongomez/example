import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BusinessHelpComponent } from './components/business-help/business-help.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { LibSharedComponentsModule } from 'projects/lib-shared-components/src/public-api';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
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
export class MueblesAccesoriosSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [],
    };
  }
}
