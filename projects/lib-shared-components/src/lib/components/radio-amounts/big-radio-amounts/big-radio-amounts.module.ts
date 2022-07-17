import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigRadioAmountsComponent } from './big-radio-amounts.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyMaskModule } from 'ng2-currency-mask';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [BigRadioAmountsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
  ],
  exports: [BigRadioAmountsComponent],
  providers: [{ provide: KeycloakService, useValue: keycloakService }],
})
export class BigRadioAmountsModule {}
