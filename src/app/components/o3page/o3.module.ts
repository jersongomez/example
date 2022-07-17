import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { routes } from './o3.routes';

import { O3HomeComponent } from './o3mobility/o3home.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { InputheaderComponent } from './inputheader/inputheader.component';
import { RadiogroupComponent } from './radiogroup/radiogroup.component';
import { AyudaventasComponent } from './ayudaventas/helppages/ayudaventas.component';
import { ContactoComponent } from './ayudaventas/contacto/contacto.component';
import { ItemparrafoComponent } from './ayudaventas/itemparrafo/itemparrafo.component';
import { ItemsconimagenesComponent } from './ayudaventas/itemsconimagenes/itemsconimagenes.component';
import { TipsventasComponent } from './ayudaventas/tipsventas/tipsventas.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ResumecalculatorComponent } from './resumecalculator/resumecalculator.component';
import { PrintComponent } from 'src/app/components/shared/print/print.component';
import { MaterialModule } from '../../material/material.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CuotaPipe } from '../../pipes/cuota.pipe';
import { RouterModule } from '@angular/router';
import { ProcessRequestComponent } from '../viability/process-request/process-request.component';
import { SolicitudModalComponent } from '../viability/solicitud-modal/solicitud-modal.component';
import { ModalContentComponent } from '../viability/modal-content/modal-content.component';
import { ModalComponent } from '../viability/modal/modal.component';
import { BirthdayPipe } from 'src/app/pipes/birthday.pipe';
import { PanelExpansionComponent } from '../viability/panel-expansion/panel-expansion.component';
import { NumbersOnlyDirective } from '../../directives/numbers-only.directive';
import { LettersOnlyDirective } from '../../directives/letters-only.directive';
import { MenuModule } from '../shared/menu/menu.module';
import { ViabilityModule } from '../viability/viability.module';
import { SharedModule } from '../shared/shared.module';
import {
  AppManualPartnersModule,
  CalculatorStoreModule,
  ContactPartnersModule,
  DomainsStoreModule,
  ItemRequestPartnersModule,
  MenuStoreModule,
  NavbarMenuModule,
  NavbarModule,
  PartnerStoreModule,
  SalesTipPartnersModule,
  StandardSizeLayoutModule,
  ViabilityStoreModule,
} from 'projects/lib-shared-components/src/public-api';

const o3Components = [
  CalculatorComponent,
  NavbarComponent,
  InputheaderComponent,
  RadiogroupComponent,
  ItemsconimagenesComponent,
  TipsventasComponent,
  FooterComponent,
  ResumecalculatorComponent,
  CuotaPipe,
  O3HomeComponent,
  AyudaventasComponent,
  NumbersOnlyDirective,
  LettersOnlyDirective,
];

@NgModule({
  declarations: [o3Components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CurrencyMaskModule,
    RouterModule.forChild(routes),
    MenuModule,
    ViabilityModule,
    SharedModule,
    NavbarModule,
    StandardSizeLayoutModule,
    AppManualPartnersModule,
    ItemRequestPartnersModule,
    SalesTipPartnersModule,
    ContactPartnersModule,
    DomainsStoreModule,
    MenuStoreModule,
    PartnerStoreModule,
    CalculatorStoreModule,
    ViabilityStoreModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class O3Module {}
