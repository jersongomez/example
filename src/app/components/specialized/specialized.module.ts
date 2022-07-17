import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './specialized.routes';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { SpecializedHomeComponent } from './specialized-home/specialized-home.component';
import { SpecializedHelpComponent } from './specialized-help/specialized-help.component';
import { MenuModule } from '../shared/menu/menu.module';
import { NavbarSpecializedComponent } from './navbar-specialized/navbar-specialized.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { TipsVentasComponent } from './tips-ventas/tips-ventas.component';
import { ViabilityModule } from '../viability/viability.module';
import { ImagesItemsComponent } from './images-items/images-items.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';

registerLocaleData(es);

@NgModule({
  declarations: [
    SpecializedHomeComponent,
    SpecializedHelpComponent,
    NavbarSpecializedComponent,
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
  ],
})
export class SpecializedModule {}
