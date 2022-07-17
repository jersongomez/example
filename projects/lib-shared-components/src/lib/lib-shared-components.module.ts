import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HomeLayoutModule } from './layouts/home-layout/home-layout.module';
import { LightHomeLayoutModule } from './layouts/home/light-home-layout';
import { BusinessHelpLayoutModule } from './layouts/business-help/business-help-layout.module';
import { NavbarModule } from './components/navbar';
import { NavbarMenuModule } from './components/navbar-menu';
import { InputheaderModule } from './components/inputheader/inputheader.module';
import { StandardSizeLayoutModule } from './layouts/standard-size-layout';
import { RadioGroupModule } from './components/radio-group';
import { BigRadioAmountsModule } from './components/radio-amounts/big-radio-amounts';
import { BigRadioGroupModule } from './components/radio-fees/big-radio-group';
import { CalculatorSummaryModule } from './components/calculator-summary';
import { PartnerStoreModule } from './store/partner';
import { DomainsStoreModule } from './store/domains';
import { MenuStoreModule } from './store/menu';
import { CalculatorStoreModule } from './store/calculator';
import { ViabilityV1Module } from './components/viability-v1/viability-v1.module';
import { ViabilityStoreModule } from './store/viability';
import { AppManualPartnersModule } from './components/partners/app-manual-partners';
import { ContactPartnersModule } from './components/partners/contact-partners';
import { ItemRequestPartnersModule } from './components/partners/item-request-partners';
import { SalesTipPartnersModule } from './components/partners/sales-tip-partners';
import { PrintDetailPartnersModule } from './components/partners/print-detail-partners';
import { MaterialModule } from 'src/app/material/material.module';
import { InputTooltipModule } from './components/input-tooltip/input-tooltip.module';
import { CalculatorModule } from './components/calculator-card/calculator/calculator.module';

@NgModule({
  declarations: [],
  imports: [
    HomeLayoutModule,
    LightHomeLayoutModule,
    NavbarModule,
    NavbarMenuModule,
    InputheaderModule,
    StandardSizeLayoutModule,
    RadioGroupModule,
    BigRadioGroupModule,
    BigRadioAmountsModule,
    CalculatorSummaryModule,
    DomainsStoreModule,
    MenuStoreModule,
    PartnerStoreModule,
    CalculatorStoreModule,
    ViabilityV1Module,
    ViabilityStoreModule,
    BusinessHelpLayoutModule,
    AppManualPartnersModule,
    ContactPartnersModule,
    ItemRequestPartnersModule,
    SalesTipPartnersModule,
    PrintDetailPartnersModule,
    MaterialModule,
    InputTooltipModule,
    CalculatorModule,
  ],
  exports: [
    HomeLayoutModule,
    LightHomeLayoutModule,
    NavbarModule,
    NavbarMenuModule,
    InputheaderModule,
    StandardSizeLayoutModule,
    RadioGroupModule,
    BigRadioGroupModule,
    BigRadioAmountsModule,
    CalculatorSummaryModule,
    DomainsStoreModule,
    MenuStoreModule,
    PartnerStoreModule,
    CalculatorStoreModule,
    ViabilityV1Module,
    ViabilityStoreModule,
    BusinessHelpLayoutModule,
    AppManualPartnersModule,
    ContactPartnersModule,
    ItemRequestPartnersModule,
    SalesTipPartnersModule,
    PrintDetailPartnersModule,
    MaterialModule,
    InputTooltipModule,
    CalculatorModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LibSharedComponentsModule {}
