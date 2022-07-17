import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './colsanitas.routes';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ColsanitasHomeComponent } from './colsanitas-home/colsanitas-home.component';
import { ColsanitasHelpComponent } from './colsanitas-help/colsanitas-help.component';
import { BusinessHelpComponent } from './components/business-help/business-help.component';
import { MenuModule } from '../../src/app/components/shared/menu/menu.module';
import { NavbarColsanitasComponent } from './navbar-colsanitas/navbar-colsanitas.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { TipsVentasComponent } from './tips-ventas/tips-ventas.component';
import { ViabilityModule } from '../../src/app/components/viability/viability.module';
import { ImagesItemsComponent } from './images-items/images-items.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../../src/app/components/shared/shared.module';
import { LibSharedComponentsModule } from 'projects/lib-shared-components/src/public-api';
import { ModalAllietsModule } from 'projects/lib-shared-components/src/lib/components/allies-store/allies-store.module';

registerLocaleData(es);

@NgModule({
  declarations: [
    ColsanitasHomeComponent,
    ColsanitasHelpComponent,
    BusinessHelpComponent,
    NavbarColsanitasComponent,
    CalculatorComponent,
    TipsVentasComponent,
    ImagesItemsComponent,
    FooterComponent,
  ],
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
    LibSharedComponentsModule,
   // ModalAllietsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

@NgModule({})
export class ColsanitasModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [],
    };
  }
}
