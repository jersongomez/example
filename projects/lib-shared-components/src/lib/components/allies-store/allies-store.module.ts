import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalAlliesComponent } from './allies-store.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDialogModule, MatSelectModule } from '@angular/material';

const imports = [
  BrowserModule,
  RouterModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  FormsModule,
  // MatDialogModule
];

const providers = [];

@NgModule({
  declarations: [ModalAlliesComponent],
  entryComponents: [ModalAlliesComponent],
  exports: [ModalAlliesComponent],
  imports: imports,
  providers: providers,
  schemas: [NO_ERRORS_SCHEMA],
})
export class ModalAllietsModule {}
