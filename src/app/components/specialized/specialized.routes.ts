import { Routes } from '@angular/router';
import { SpecializedHelpComponent } from './specialized-help/specialized-help.component';
import { SpecializedHomeComponent } from './specialized-home/specialized-home.component';

export const routes: Routes = [
  { path: '', component: SpecializedHomeComponent, data: { ruta: '/specialized' } },
  { path: 'ayuda', component: SpecializedHelpComponent, data: { ruta: '/specialized/ayuda' } },
];
