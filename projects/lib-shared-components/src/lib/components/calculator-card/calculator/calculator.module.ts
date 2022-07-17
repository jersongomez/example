import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { InputheaderModule } from '../../inputheader';
import { InputTooltipModule } from '../../input-tooltip';
import { RadioGroupModule } from '../../radio-group';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyMaskModule } from 'ng2-currency-mask';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
    InputheaderModule,
    InputTooltipModule,
    RadioGroupModule,
  ],
  exports: [CalculatorComponent],
  providers: [{ provide: KeycloakService, useValue: keycloakService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalculatorModule {}
