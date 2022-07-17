import { Routes } from '@angular/router';
import { SecurityGuard } from 'src/app/guards/security.guard';
import { ColsanitasHomeComponent } from './colsanitas-home/colsanitas-home.component';
import { BusinessHelpComponent } from './components/business-help/business-help.component';

export const routes: Routes = [
  {
    path: 'colsanitas',
    component: ColsanitasHomeComponent,
    canActivate: [SecurityGuard],
    data: { ruta: '/colsanitas' },
  },
  {
    path: 'colsanitas/ayuda',
    component: BusinessHelpComponent,
    data: { ruta: '/colsanitas/ayuda' }
  }
];
