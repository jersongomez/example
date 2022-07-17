import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarMenuComponent } from './navbar-menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [NavbarMenuComponent],
  imports: [CommonModule, FlexLayoutModule, ReactiveFormsModule, FormsModule, MaterialModule],
  exports: [NavbarMenuComponent],
})
export class NavbarMenuModule {}
