import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from 'src/app/guards/security.guard';
import { HomeComponent } from './components/home/home.component';
import { SignedDocumentsComponent } from './components/signed-documents/signed-documents.component';

const routes: Routes = [
  {
    path: 'backoffice',
    component: HomeComponent,
    canActivate: [SecurityGuard],
  },
  {
    path: 'SignendDocuments',
    component: SignedDocumentsComponent,
    canActivate: [SecurityGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
