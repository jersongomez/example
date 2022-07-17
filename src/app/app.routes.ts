import { Routes, RouterModule } from '@angular/router';
import { Constants } from './utils/constants';
import { SecurityGuard } from './guards/security.guard';
import { NoPageFoundComponent } from './public/no-page-found.component';

const appRoutes: Routes = [
  {
    path: Constants.ALIADO_GAES,
    loadChildren: () => import('../../projects/gaes/src/app/app.module').then((m) => m.GaesSharedModule),
    canActivate: [SecurityGuard],
  },
  {
    path: Constants.ALIADO_O3,
    loadChildren: () => import('./components/o3page/o3.module').then((m) => m.O3Module),
    canActivate: [SecurityGuard],
  },
  {
    path: Constants.ALIADO_AUTOMUNDIAL,
    loadChildren: () => import('../../projects/automundial/src/app/app.module').then((m) => m.AutoMundialSharedModule),
    canActivate: [SecurityGuard],
  },
  {
    path: Constants.ALIADO_SPECIALIZED,
    loadChildren: () => import('./components/specialized/specialized.module').then((m) => m.SpecializedModule),
    canActivate: [SecurityGuard],
  },
  {
    path: Constants.ALIADO_COLSANITAS,
    loadChildren: () => import('../../projects/Colsanitas/colsanitas.module').then((m) => m.ColsanitasModule),
    canActivate: [SecurityGuard],
  },
  {
    path: Constants.PUBLIC,
    component: NoPageFoundComponent,
  },
  { path: '**', pathMatch: 'full', redirectTo: Constants.CLIENTS_PUBLIC },
  {
    path: Constants.ALIADO_PARAISO,
    loadChildren: () => import('../../projects/paraiso/src/app/app.module').then((m) => m.ParaisoSharedModule),
    canActivate: [SecurityGuard],
  },
  {
    path: Constants.ALIADO_CEMEX,
    loadChildren: () => import('../../projects/cemex/src/app/app.module').then((m) => m.CemexSharedModule),
    canActivate: [SecurityGuard],
  },
  {
    path: Constants.BACK_OFFICE,
    loadChildren: () => import('../../projects/backoffice/src/app/app.module').then((m) => m.BackOfficeSharedModule),
    canActivate: [SecurityGuard],
  },
  {
    path: Constants.ALIADO_MUEBLES_Y_ACCESORIOS,
    loadChildren: () =>
      import('../../projects/muebles-accesorios/src/app/app.module').then((m) => m.MueblesAccesoriosSharedModule),
    canActivate: [SecurityGuard],
  },
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
