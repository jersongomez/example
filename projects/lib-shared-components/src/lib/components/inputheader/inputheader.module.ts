import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputheaderComponent } from './inputheader.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyMaskModule } from 'ng2-currency-mask';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [InputheaderComponent],
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
  exports: [InputheaderComponent],
  providers: [{ provide: KeycloakService, useValue: keycloakService }],
})
export class InputheaderModule {}
