import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from 'src/app/guards/security.guard';
import { Constants } from 'src/app/utils/constants';
import { BusinessHelpComponent } from './components/business-help/business-help.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: Constants.ALIADO_MUEBLES_Y_ACCESORIOS,
    component: HomeComponent,
    canActivate: [SecurityGuard],
  },
  {
    path: `${Constants.ALIADO_MUEBLES_Y_ACCESORIOS}/ayuda`,
    component: BusinessHelpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
