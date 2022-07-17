import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessHelpComponent } from './components/business-help/business-help.component';
import { SecurityGuard } from 'src/app/guards/security.guard';
import { Constants } from 'src/app/utils/constants';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: Constants.ALIADO_GAES,
    component: HomeComponent,
    canActivate: [SecurityGuard],
  },
  {
    path: `${Constants.ALIADO_GAES}/ayuda`,
    component: BusinessHelpComponent,
    data: {
      ruta: `${Constants.ALIADO_GAES}/ayuda`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
