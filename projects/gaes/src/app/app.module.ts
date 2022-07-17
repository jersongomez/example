import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LibSharedComponentsModule } from 'projects/lib-shared-components/src/public-api';
import { DialogComponent } from './components/dialog/dialog.component';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicLayoutComponent } from './layout/basic/basic-layout.component';
import { BusinessHelpComponent } from './components/business-help/business-help.component';
import { LoanDetailComponent } from './components/loan-detail/loan-detail.component';
import { InitialPercentComponent } from './components/initial-percent/initial-percent.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ModalAllietsModule } from 'projects/lib-shared-components/src/lib/components/allies-store/allies-store.module';
import { MomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogComponent,
    BasicLayoutComponent,
    BusinessHelpComponent,
    LoanDetailComponent,
    InitialPercentComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    BrowserModule,
    AppRoutingModule,
    LibSharedComponentsModule,
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    //  ModalAllietsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [DialogComponent],
})
export class AppModule {}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({})
export class GaesSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
    };
  }
}
