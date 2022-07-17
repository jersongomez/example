import { Routes } from '@angular/router';
import { O3HomeComponent } from './o3mobility/o3home.component';
import { AyudaventasComponent } from './ayudaventas/helppages/ayudaventas.component';

export const routes: Routes = [
  { path: '', component: O3HomeComponent, data: { ruta: '/o3mobility' } },
  { path: 'ayuda', component: AyudaventasComponent, data: { ruta: '/o3mobility/ayuda' } },
];
