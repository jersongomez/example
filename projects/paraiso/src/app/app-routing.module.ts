import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from 'src/app/guards/security.guard';
import { Constants } from 'src/app/utils/constants';
import { BusinessHelpComponent } from './components/business-help/business-help.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: Constants.ALIADO_PARAISO,
    component: HomeComponent,
    canActivate: [SecurityGuard],
  },
  {
    path: 'paraiso/ayuda',
    component: BusinessHelpComponent,
    data: {
      ruta: '/paraiso/ayuda',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
