import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from 'src/app/guards/security.guard';
import { Constants } from 'src/app/utils/constants';
import { BusinessHelpComponent } from './components/business-help/business-help.component';
import { CompraComponent } from './components/compra/compra.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: Constants.ALIADO_AUTOMUNDIAL,
    component: HomeComponent,
    canActivate: [SecurityGuard],
  },
  {
    path: `${Constants.ALIADO_AUTOMUNDIAL}/compra`,
    component: CompraComponent,
    data: {
      ruta: `${Constants.ALIADO_AUTOMUNDIAL}/compra`,
    },
  },
  {
    path: `${Constants.ALIADO_AUTOMUNDIAL}/ayuda`,
    component: BusinessHelpComponent,
    data: {
      ruta: `${Constants.ALIADO_AUTOMUNDIAL}/ayuda`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
