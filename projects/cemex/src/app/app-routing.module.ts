import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from 'src/app/guards/security.guard';
import { BusinessHelpComponent } from './components/business-help/business-help.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'cemex',
    component: HomeComponent,
    canActivate: [SecurityGuard],
  },
  {
    path: 'cemex/ayuda',
    component: BusinessHelpComponent,
    data: {
      ruta: '/cemex/ayuda',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
