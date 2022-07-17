import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CompraComponent } from './components/compra/compra.component';
import { CompraDialogComponent } from './components/compra-dialog/compra-dialog.component';
import { BasicLayoutComponent } from './layouts/basic-layout/basic-layout.component';
import { LibSharedComponentsModule } from 'projects/lib-shared-components/src/public-api';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { registerLocaleData } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';

import es from '@angular/common/locales/es';
import { BusinessHelpComponent } from './components/business-help/business-help.component';
import { ModalAllietsModule } from 'projects/lib-shared-components/src/lib/components/allies-store/allies-store.module';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompraComponent,
    BusinessHelpComponent,
    BasicLayoutComponent,
    CompraDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    FormsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    LibSharedComponentsModule,
    MatDialogModule,
    //   ModalAllietsModule
  ],
  entryComponents: [CompraDialogComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

@NgModule({})
export class AutoMundialSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [],
    };
  }
}
