import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintComponent } from './print/print.component';
import { ItemparrafoComponent } from '../o3page/ayudaventas/itemparrafo/itemparrafo.component';
import { ContactoComponent } from '../o3page/ayudaventas/contacto/contacto.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';

const sharedComponents = [PrintComponent, ItemparrafoComponent, ContactoComponent];

@NgModule({
  declarations: [sharedComponents],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule, CurrencyMaskModule],
  exports: [sharedComponents],
})
export class SharedModule {}
