import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, DoBootstrap } from '@angular/core';
import es from '@angular/common/locales/es';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { NoPageFoundComponent } from './public/no-page-found.component';
import { environment } from 'src/environments/environment';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ParaisoSharedModule } from 'projects/paraiso/src/app/app.module';
import { GaesSharedModule } from 'projects/gaes/src/app/app.module';
import { AutoMundialSharedModule } from 'projects/automundial/src/app/app.module';
import { CemexSharedModule } from 'projects/cemex/src/app/app.module';
import { ColsanitasModule } from 'projects/Colsanitas/colsanitas.module';
import { BackOfficeSharedModule } from 'projects/backoffice/src/app/app.module';

import { AppConfig } from './app-config';
import { MueblesAccesoriosSharedModule } from 'projects/muebles-accesorios/src/app/app.module';
import { ModalModule } from './common/modal/modal.module';
import { MainHttpInterceptor } from './interceptors/main-http-interceptor';
import { Tasas } from 'projects/lib-shared-components/src/lib/services/viability-v1/bizagiEnumTasas';

registerLocaleData(es);

const keycloakService = new KeycloakService();

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.loadEnvironmentConfig();
}

@NgModule({
  declarations: [AppComponent, NoPageFoundComponent],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    APP_ROUTES,
    MaterialModule,
    ModalModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    ParaisoSharedModule.forRoot(),
    GaesSharedModule.forRoot(),
    AutoMundialSharedModule.forRoot(),
    CemexSharedModule.forRoot(),
    ColsanitasModule.forRoot(),
    BackOfficeSharedModule.forRoot(),
    MueblesAccesoriosSharedModule.forRoot(),
    // ModalModule
  ],
  providers: [
    DecimalPipe, Tasas,
    { provide: KeycloakService, useValue: keycloakService },
    { provide: LOCALE_ID, useValue: 'es' },
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true,
    },
    // {
    //   multi: true,
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MainHttpInterceptor,
    // },
  ],
  entryComponents: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule implements DoBootstrap {
  async ngDoBootstrap(app: any) {
    const { keycloakConfig } = AppConfig.settings;
    try {
      await keycloakService.init({
        config: keycloakConfig,
        bearerPrefix: 'Bearer',
      });
      app.bootstrap(AppComponent);
    } catch (error) {
      console.error('Keycloak init failed', error);
    }
  }
}
